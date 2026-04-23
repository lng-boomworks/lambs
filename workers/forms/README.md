# Lambs Forms — Cloudflare Worker

Thin relay that accepts form POSTs from the website (GitHub Pages) and sends the content through Resend. Keeps the Resend API key off the public site.

## One-time setup

1. Install wrangler globally or use `npx`:
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. Install deps for this worker:
   ```bash
   cd workers/forms
   npm install
   ```

3. Create a Resend account at https://resend.com, verify the `lambsgroup.co.uk` sending domain (SPF / DKIM / DMARC records they give you), then create an API key.

4. Add the API key as a worker secret (never committed):
   ```bash
   wrangler secret put RESEND_API_KEY
   # paste the key when prompted
   ```

5. Edit `wrangler.toml` if your sender / recipient addresses differ from the defaults:
   - `FROM_EMAIL` — must be on a verified Resend domain
   - `TO_GENERAL` — contact form recipient
   - `TO_CAREERS` — job application recipient
   - `ALLOWED_ORIGINS` — comma-separated list of origins that can POST

6. Deploy:
   ```bash
   npm run deploy
   ```

   Wrangler prints the live URL, e.g. `https://lambs-forms.<subdomain>.workers.dev`.

## Wiring the site

The Astro site reads `PUBLIC_FORM_ENDPOINT` at build time. Two places to set it:

1. **Locally for dev previews** — create `.env` in the repo root:
   ```
   PUBLIC_FORM_ENDPOINT=https://lambs-forms.<subdomain>.workers.dev
   ```

2. **GitHub Pages build** — set it as a repo variable:
   - Settings → Secrets and variables → Actions → Variables tab → New repository variable
   - Name: `PUBLIC_FORM_ENDPOINT`
   - Value: the worker URL
   - The deploy workflow already passes it through to `npm run build`.

Once set, the contact and careers forms will POST through to the worker and Resend will send the email.

## Form contract

The site POSTs `multipart/form-data` with a hidden `form` field identifying the submission type:

| `form` value | Routes to | Subject |
|---|---|---|
| `contact-commercial` | `TO_GENERAL` | `Commercial project enquiry` |
| `contact-domestic` | `TO_GENERAL` | `Private Works quote request` |
| `careers-application` | `TO_CAREERS` | `Careers: <role>` |

File attachments (only CVs right now) flow through as Resend attachments, capped at 10 MB per file.

## Testing

```bash
# Local dev — the worker runs on 127.0.0.1:8787
wrangler dev

# Tail production logs
wrangler tail
```

## Protections

- Origin allow-list (browsers only — not a real security boundary, just noise reduction).
- Honeypot field (`website`) — silently accepts bot submissions without sending.
- 10 MB attachment cap per file.

Consider adding Cloudflare Turnstile if spam becomes a problem.
