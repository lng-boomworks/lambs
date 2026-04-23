export interface Env {
  RESEND_API_KEY: string;
  FROM_EMAIL: string; // e.g. "website@lambsgroup.co.uk"
  TO_GENERAL: string; // e.g. "info@lambsgroup.co.uk"
  TO_CAREERS: string; // e.g. "careers@lambsgroup.co.uk"
  ALLOWED_ORIGINS: string; // comma-separated list
}

interface Route {
  to: string;
  subject: (form: FormData) => string;
}

const FIELD_ORDER = [
  "name",
  "company",
  "email",
  "phone",
  "location",
  "postcode",
  "address",
  "sector",
  "finish",
  "timing",
  "role",
  "role_slug",
  "message",
  "notes",
];

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  location: "Location / postcode",
  postcode: "Postcode",
  address: "Address",
  sector: "Sector",
  finish: "Finish",
  timing: "Timing",
  role: "Role",
  role_slug: "Role slug",
  message: "Message",
  notes: "Notes",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    const allowed = (env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const cors = corsHeaders(origin, allowed);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }
    if (allowed.length && !allowed.includes(origin)) {
      return json({ error: "Forbidden origin" }, 403, cors);
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return json({ error: "Invalid form payload" }, 400, cors);
    }

    // Honeypot — bots tend to fill every field. Humans never fill this one.
    if (String(form.get("website") ?? "").length > 0) {
      // Pretend success so we don't signal the trap is there.
      return json({ ok: true }, 200, cors);
    }

    const formType = String(form.get("form") ?? "").trim();
    const routes: Record<string, Route> = {
      "contact-commercial": {
        to: env.TO_GENERAL,
        subject: () => "Commercial project enquiry",
      },
      "contact-domestic": {
        to: env.TO_GENERAL,
        subject: () => "Private Works quote request",
      },
      "careers-application": {
        to: env.TO_CAREERS,
        subject: (f) => `Careers: ${f.get("role") ?? "application"}`,
      },
    };
    const route = routes[formType];
    if (!route) {
      return json({ error: "Unknown form" }, 400, cors);
    }

    // Collect fields + file attachments
    const fields: Array<[string, string]> = [];
    const attachments: Array<{ filename: string; content: string }> = [];
    for (const [key, value] of form.entries()) {
      if (key === "form" || key === "website") continue;
      if (value instanceof File && value.size > 0) {
        if (value.size > 10 * 1024 * 1024) {
          return json({ error: `Attachment ${value.name} exceeds 10 MB` }, 413, cors);
        }
        const buf = new Uint8Array(await value.arrayBuffer());
        attachments.push({ filename: value.name, content: bytesToBase64(buf) });
      } else if (!(value instanceof File)) {
        fields.push([key, String(value)]);
      }
    }

    const html = renderHtml(fields);
    const text = renderText(fields);
    const replyTo = (fields.find(([k]) => k === "email") ?? [])[1] || undefined;

    const payload: Record<string, unknown> = {
      from: env.FROM_EMAIL,
      to: [route.to],
      subject: route.subject(form),
      html,
      text,
    };
    if (replyTo) payload.reply_to = replyTo;
    if (attachments.length) payload.attachments = attachments;

    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resendResp.ok) {
      const detail = await resendResp.text().catch(() => "");
      console.error("Resend error", resendResp.status, detail);
      return json({ error: "Send failed" }, 502, cors);
    }

    return json({ ok: true }, 200, cors);
  },
};

function corsHeaders(origin: string, allowed: string[]): Record<string, string> {
  const allow = allowed.includes(origin) ? origin : allowed[0] ?? "*";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, extra: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function labelFor(key: string): string {
  return FIELD_LABELS[key] ?? key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function sortFields(fields: Array<[string, string]>): Array<[string, string]> {
  return fields.slice().sort(([a], [b]) => {
    const ai = FIELD_ORDER.indexOf(a);
    const bi = FIELD_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    const m: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return m[c]!;
  });
}

function renderHtml(fields: Array<[string, string]>): string {
  const rows = sortFields(fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;vertical-align:top;color:#7DA0C3;text-transform:uppercase;font-size:11px;letter-spacing:0.14em;font-family:-apple-system,Segoe UI,sans-serif;white-space:nowrap">${escapeHtml(
          labelFor(k)
        )}</td><td style="padding:8px 0;color:#264A88;font-size:14px;font-family:-apple-system,Segoe UI,sans-serif">${escapeHtml(
          v
        ).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#F5F5F7;padding:32px"><table style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #E5E5E5"><tr><td style="padding:24px 32px;border-bottom:1px solid #E5E5E5"><div style="color:#7DA0C3;text-transform:uppercase;font-size:11px;letter-spacing:0.18em;font-family:-apple-system,Segoe UI,sans-serif">Lambs Group — website submission</div></td></tr><tr><td style="padding:24px 32px"><table style="width:100%;border-collapse:collapse">${rows}</table></td></tr></table></body></html>`;
}

function renderText(fields: Array<[string, string]>): string {
  return sortFields(fields)
    .map(([k, v]) => `${labelFor(k)}: ${v}`)
    .join("\n");
}
