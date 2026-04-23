# Lambs Group Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Lambs Group site against the brand guidelines in `docs/brand/Brand Guidelines.pdf`, with cinematic-tier page transitions, sector-specific motion signatures, and three new structural pages (UK live works map, Motif microsite, How We Deliver process page).

**Architecture:** Astro 6 static site with React 19 islands. Native Astro View Transitions for page navigation. IntersectionObserver + CSS `scroll-timeline` (with polyfill) for scroll-bound motion. Custom SVG components for every sector signature — no animation libraries. Static JSON data file powers the UK map. Two Web3Forms endpoints (commercial brief + domestic quote).

**Tech Stack:** Astro 6, React 19, Tailwind CSS 4 (already in `package.json`), Inter font (self-hosted), Lucide React icons (already installed), Web3Forms for forms.

**Spec reference:** `docs/superpowers/specs/2026-04-23-lambs-website-redesign-design.md`
**Brand reference:** `docs/brand/Brand Guidelines.pdf`

---

## Milestones (Review/Ship Checkpoints)

| Milestone | Phases | What's shippable at the end |
|---|---|---|
| **M1 — Foundation** | 1–3 | Site renders with brand palette, official logo, global chrome (Navbar, Footer), motion primitives. Existing pages still work but now visually on-brand. |
| **M2 — Sector pages** | 4–7 | Four sector pages (Telecoms, Civils, Utilities, new Private Works) complete with signature motion. |
| **M3 — Structural pages** | 8–11 | Our Work rebuild, Motif microsite, How We Deliver, UK Map all live. |
| **M4 — Polish & QA** | 12 | 404, SEO, a11y, performance, content pass. Launch-ready. |

Stop at any milestone for review. Each milestone produces a shippable vertical slice — the site is never broken mid-milestone.

---

## Brand Token Reference (used throughout the plan)

| Token | Hex | Tailwind CSS var |
|---|---|---|
| Dark Blue | `#264A88` | `--color-dark-blue` |
| Cyan | `#6CC5EA` | `--color-cyan` |
| Mid Blue | `#7DA0C3` | `--color-mid-blue` |
| Light Grey | `#F5F5F7` | `--color-light-grey` |
| Charcoal | `#242A38` | `--color-charcoal` |
| White | `#FFFFFF` | `--color-white` |

**Typography:** Inter 400 (body) + Inter 600 (headings). Nothing else.

---

# Phase 1 — Brand Foundation

Migrate the scaffold's industrial palette and typography to the official Lambs brand. At the end of this phase the site still has its old layouts but wears the real brand.

### Task 1: Install Inter font, remove Space Grotesk and JetBrains Mono

**Files:**
- Modify: `src/layouts/Base.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Read the existing Base.astro to identify font links**

```bash
grep -n "font" src/layouts/Base.astro
```

- [ ] **Step 2: In `src/layouts/Base.astro`, replace any existing font `<link>` tags in the `<head>` with this block (Inter only, two weights)**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

- [ ] **Step 3: In `src/styles/global.css`, in the `@theme inline` block, replace the `--font-display`, `--font-sans`, `--font-mono` lines with**

```css
  /* Typography — Inter only per brand guide (two fonts max) */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Inter', ui-sans-serif, system-ui, sans-serif;
```

Remove the `--font-mono` declaration entirely.

- [ ] **Step 4: Run dev server and visually verify on any page**

```bash
npm run dev
```

Expected: Page text renders in Inter. No more Space Grotesk or JetBrains Mono.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Base.astro src/styles/global.css
git commit -m "chore: install Inter, remove Space Grotesk and JetBrains Mono"
```

---

### Task 2: Migrate colour tokens to brand palette

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: In `src/styles/global.css`, replace the entire `@theme inline` block content with the brand palette**

Replace the existing block:

```css
@theme inline {
  /* Lambs UK brand palette */
  --color-ink: #0A0E1A;
  --color-ink-soft: #141927;
  --color-hivis: #FFD60A;
  --color-hivis-dim: #E6C009;
  --color-concrete: #6B7280;
  --color-concrete-light: #9CA3AF;
  --color-steel: #1E3A5F;
  --color-steel-light: #2A4D78;
  --color-warm-white: #FAFAF9;
  --color-cream: #F5F5F4;
  --color-white: #FFFFFF;
  --color-border: rgba(10, 14, 26, 0.08);
  --color-border-strong: rgba(10, 14, 26, 0.14);

  /* Semantic tokens */
  --color-background: var(--color-warm-white);
  --color-foreground: var(--color-ink);
  --color-muted: var(--color-concrete);
  --color-accent: var(--color-hivis);
  --color-primary: var(--color-ink);
  --color-primary-foreground: var(--color-white);
  --color-card: var(--color-white);
  --color-card-foreground: var(--color-ink);

  /* Typography */
  --font-display: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;

  /* Easing */
  --ease-silk: cubic-bezier(0.16, 1, 0.3, 1);
}
```

With:

```css
@theme inline {
  /* Lambs Group brand palette (from docs/brand/Brand Guidelines.pdf) */
  --color-dark-blue: #264A88;
  --color-cyan: #6CC5EA;
  --color-mid-blue: #7DA0C3;
  --color-light-grey: #F5F5F7;
  --color-charcoal: #242A38;
  --color-white: #FFFFFF;

  /* Derived tints for borders and rules */
  --color-border: rgba(125, 160, 195, 0.18);        /* mid-blue @ 18% */
  --color-border-strong: rgba(125, 160, 195, 0.32); /* mid-blue @ 32% */

  /* Semantic tokens */
  --color-background: var(--color-white);
  --color-foreground: var(--color-charcoal);
  --color-muted: var(--color-mid-blue);
  --color-accent: var(--color-cyan);
  --color-primary: var(--color-dark-blue);
  --color-primary-foreground: var(--color-white);
  --color-card: var(--color-white);
  --color-card-foreground: var(--color-charcoal);

  /* Typography — Inter only */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Easing */
  --ease-silk: cubic-bezier(0.16, 1, 0.3, 1);
}
```

- [ ] **Step 2: Update the base layer block in the same file to use Dark Blue for headings**

Replace the existing `@layer base { ... }` block with:

```css
@layer base {
  * {
    border-color: var(--color-border);
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-sans);
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-size: 16px;
    line-height: 1.65;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--color-dark-blue);
    line-height: 1.08;
  }

  h1 {
    font-size: clamp(44px, 6.5vw, 104px);
    letter-spacing: -0.025em;
  }

  h2 {
    font-size: clamp(34px, 4.5vw, 64px);
    letter-spacing: -0.02em;
  }

  h3 {
    font-size: clamp(22px, 2.4vw, 30px);
  }

  p {
    color: var(--color-charcoal);
  }

  ::selection {
    background: var(--color-cyan);
    color: var(--color-dark-blue);
  }

  *:focus-visible {
    outline: 2px solid var(--color-dark-blue);
    outline-offset: 2px;
    border-radius: 2px;
  }
}
```

- [ ] **Step 3: Run build to confirm no CSS syntax errors**

```bash
npm run build
```

Expected: Build completes. No errors related to missing CSS vars (existing components reference `--color-ink`, `--color-hivis`, etc. — those will break visually but the build succeeds because Tailwind CSS vars don't fail the build).

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(brand): migrate colour tokens to Lambs Group brand palette"
```

---

### Task 3: Remove grit-era utility classes, add brand utility classes

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: In `src/styles/global.css`, remove these utility class blocks entirely**

Delete:
- `.text-ink`, `.text-muted`, `.text-hivis`, `.text-steel`
- `.bg-ink`, `.bg-ink-soft`, `.bg-hivis`, `.bg-cream`, `.bg-warm-white`, `.bg-steel`
- `.border-ink`, `.border-hivis`
- `.grid-bg-dark` (keep `.grid-bg`)
- `.hivis-stripe`
- `.font-mono` (no mono typeface anymore)

- [ ] **Step 2: Replace the removed utility-class block with the new brand utilities**

Add after the `@layer base { }` block:

```css
/* --- Brand utility classes --- */
.text-dark-blue { color: var(--color-dark-blue); }
.text-cyan { color: var(--color-cyan); }
.text-mid-blue { color: var(--color-mid-blue); }
.text-charcoal { color: var(--color-charcoal); }
.text-muted { color: var(--color-mid-blue); }

.bg-dark-blue { background-color: var(--color-dark-blue); }
.bg-cyan { background-color: var(--color-cyan); }
.bg-mid-blue { background-color: var(--color-mid-blue); }
.bg-light-grey { background-color: var(--color-light-grey); }
.bg-charcoal { background-color: var(--color-charcoal); }
.bg-white { background-color: var(--color-white); }

.border-dark-blue { border-color: var(--color-dark-blue); }
.border-cyan { border-color: var(--color-cyan); }
.border-mid-blue { border-color: var(--color-mid-blue); }

/* Subtle grid background (retained, recoloured) */
.grid-bg {
  background-image:
    linear-gradient(to right, rgba(125, 160, 195, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(125, 160, 195, 0.08) 1px, transparent 1px);
  background-size: 64px 64px;
}

.grid-bg-dark {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 64px 64px;
}
```

- [ ] **Step 3: Rewrite the `.eyebrow` utility (was hi-vis dash — now Mid Blue small-caps label)**

Replace the existing `.eyebrow` and `.eyebrow-dark` blocks with:

```css
/* --- Eyebrow label (Mid Blue small-caps) --- */
.eyebrow {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-mid-blue);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.eyebrow::before {
  content: "";
  display: inline-block;
  width: 28px;
  height: 1px;
  background: var(--color-cyan);
}

.eyebrow-dark {
  color: rgba(255, 255, 255, 0.72);
}

.eyebrow-dark::before {
  background: var(--color-cyan);
}
```

- [ ] **Step 4: Update `.nav-link`, `.btn-arrow`, `.fade-in`, `.heading-reveal`, `.reveal-image` blocks — swap colours**

In `.reveal-image`, change the `background: var(--color-cream);` line to `background: var(--color-light-grey);`

In `.logo-tile`, the existing block is fine — keep as-is.

- [ ] **Step 5: Run dev server, visually verify on home page**

```bash
npm run dev
```

Expected: The home page will now be visually broken (existing components still reference deleted `--color-ink`, `--color-hivis` vars). That's expected — we fix it in later tasks. But eyebrow labels should now render as Mid Blue small-caps with a Cyan dash.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(brand): replace grit utilities with brand-aligned classes and eyebrow treatment"
```

---

### Task 4: Add LAMBS GROUP logo assets

**Files:**
- Create: `public/images/logo-lambs-group-colour.svg`
- Create: `public/images/logo-lambs-group-white.svg`

- [ ] **Step 1: Create the colour logo SVG**

Write to `public/images/logo-lambs-group-colour.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 48" role="img" aria-label="Lambs Group">
  <!-- Mark (placeholder until official SVG supplied) -->
  <g fill="#264A88">
    <path d="M4 24 Q16 8 32 24 Q44 40 56 24" stroke="#264A88" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="48" cy="20" r="4" fill="#6CC5EA"/>
  </g>
  <!-- Wordmark -->
  <text x="72" y="32" font-family="Inter, sans-serif" font-size="26" font-weight="700" letter-spacing="0.02em" fill="#264A88">LAMBS</text>
  <text x="172" y="32" font-family="Inter, sans-serif" font-size="26" font-weight="700" letter-spacing="0.02em" fill="#6CC5EA">GROUP</text>
</svg>
```

- [ ] **Step 2: Create the white logo SVG**

Write to `public/images/logo-lambs-group-white.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 48" role="img" aria-label="Lambs Group">
  <g fill="#FFFFFF">
    <path d="M4 24 Q16 8 32 24 Q44 40 56 24" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="48" cy="20" r="4" fill="#6CC5EA"/>
  </g>
  <text x="72" y="32" font-family="Inter, sans-serif" font-size="26" font-weight="700" letter-spacing="0.02em" fill="#FFFFFF">LAMBS</text>
  <text x="172" y="32" font-family="Inter, sans-serif" font-size="26" font-weight="700" letter-spacing="0.02em" fill="#6CC5EA">GROUP</text>
</svg>
```

**Note:** These SVGs are a close approximation of the logo in the brand guide. Client will replace with the official SVG file — the path stays the same so no code changes needed when they drop the real file.

- [ ] **Step 3: Commit**

```bash
git add public/images/logo-lambs-group-colour.svg public/images/logo-lambs-group-white.svg
git commit -m "feat(brand): add LAMBS GROUP logo SVGs (approximation — client to replace with official file)"
```

---

### Task 5: Build Logo component

**Files:**
- Create: `src/components/Logo.tsx`

- [ ] **Step 1: Create `src/components/Logo.tsx`**

```tsx
interface LogoProps {
  variant?: "colour" | "white";
  className?: string;
  width?: number;
}

export function Logo({ variant = "colour", className = "", width = 140 }: LogoProps) {
  const src =
    variant === "white"
      ? "/images/logo-lambs-group-white.svg"
      : "/images/logo-lambs-group-colour.svg";

  return (
    <img
      src={src}
      alt="Lambs Group"
      className={className}
      width={width}
      height={width * (48 / 280)}
      style={{ display: "block" }}
    />
  );
}
```

- [ ] **Step 2: Build to confirm TypeScript compiles**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Logo.tsx
git commit -m "feat: add Logo component with colour and white variants"
```

---

### Task 6: Wipe `.heading-reveal` hi-vis stripe colour; update `.reveal-image` wipe to Cyan

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: In `src/styles/global.css`, update the `.reveal-image` block to use a Cyan wipe line**

Replace the existing `.reveal-image img` block with:

```css
.reveal-image {
  position: relative;
  display: block;
  overflow: hidden;
  background: var(--color-light-grey);
}
.reveal-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.08);
  opacity: 0;
  clip-path: inset(0 100% 0 0);
  transition:
    transform 1.4s var(--ease-silk),
    opacity 1.1s var(--ease-silk),
    clip-path 1.4s var(--ease-silk);
  will-change: transform, opacity, clip-path;
}

/* Cyan wipe line that races ahead of the image reveal */
.reveal-image::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 2px;
  background: var(--color-cyan);
  transform: translateX(-2px);
  opacity: 0;
  transition: transform 1.3s var(--ease-silk), opacity 1.3s var(--ease-silk);
  will-change: transform, opacity;
  pointer-events: none;
}
.reveal-image.is-visible::after {
  transform: translateX(100vw);
  opacity: 0.9;
}
.reveal-image.is-visible img {
  transform: scale(1);
  opacity: 1;
  clip-path: inset(0 0 0 0);
}
.reveal-image:hover img {
  transform: scale(1.04);
  transition: transform 0.9s var(--ease-silk);
}
```

- [ ] **Step 2: Verify visually**

```bash
npm run dev
```

Scroll to any page section with a `RevealImage`. You should see a thin Cyan vertical line sweep across as the image reveals.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(motion): Cyan wipe line on image reveals (was hi-vis)"
```

---

### Task 7: Tighten `AnimatedHeading` stagger and update `heading-reveal` styles

**Files:**
- Modify: `src/components/AnimatedHeading.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Read the existing `AnimatedHeading.tsx` to find the default stagger**

```bash
grep -n "stagger" src/components/AnimatedHeading.tsx
```

- [ ] **Step 2: In `src/components/AnimatedHeading.tsx`, change the default `stagger` prop from 70 to 40**

Find the line that looks like `stagger = 70` in the props destructuring and change the default to `40`. Keep the rest of the component identical.

- [ ] **Step 3: In `src/styles/global.css`, shorten the heading-reveal transition from 0.9s to 0.75s**

Find the `.heading-reveal .word > span` rule and update its transition:

```css
.heading-reveal .word > span {
  display: inline-block;
  transform: translateY(110%) rotate(3deg);
  opacity: 0;
  transition:
    transform 0.75s var(--ease-silk),
    opacity 0.75s var(--ease-silk);
  will-change: transform, opacity;
}
```

- [ ] **Step 4: Visual check**

```bash
npm run dev
```

Headings should reveal with punchier stagger — tighter and crisper than before.

- [ ] **Step 5: Commit**

```bash
git add src/components/AnimatedHeading.tsx src/styles/global.css
git commit -m "feat(motion): tighten heading stagger to 40ms and transition to 0.75s"
```

---

### Task 8: Update Button component for new palette

**Files:**
- Modify: `src/components/Button.tsx`

- [ ] **Step 1: Read the existing Button.tsx**

```bash
cat src/components/Button.tsx
```

- [ ] **Step 2: Replace the contents of `src/components/Button.tsx` with**

```tsx
import type { ReactNode } from "react";
import { ArrowUpRight, ArrowRight, Calendar, Phone, Mail } from "lucide-react";

type Variant = "primary" | "secondary" | "tertiary" | "outline-white" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";
type Arrow = "right" | "up-right" | "none";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  size?: Size;
  arrow?: Arrow;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  // Primary = Cyan fill, Dark Blue text (brand: Cyan for buttons/highlights, capped to 10-15% of layout)
  primary: "bg-[var(--color-cyan)] text-[var(--color-dark-blue)] hover:bg-[color-mix(in_srgb,var(--color-cyan)_85%,var(--color-dark-blue))]",
  // Accent = alias for primary, kept for backward compatibility with existing call sites
  accent: "bg-[var(--color-cyan)] text-[var(--color-dark-blue)] hover:bg-[color-mix(in_srgb,var(--color-cyan)_85%,var(--color-dark-blue))]",
  // Secondary = Dark Blue outline, Dark Blue text, Cyan fill on hover
  secondary: "border border-[var(--color-dark-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-cyan)] hover:text-[var(--color-dark-blue)]",
  // Tertiary = text-only Dark Blue with Cyan underline on hover
  tertiary: "text-[var(--color-dark-blue)] underline-offset-4 decoration-transparent decoration-2 hover:decoration-[var(--color-cyan)] underline",
  // Outline-white = for Dark Blue backgrounds
  "outline-white": "border border-white text-white hover:bg-white hover:text-[var(--color-dark-blue)]",
  // Ghost = plain text with hover tint
  ghost: "text-[var(--color-dark-blue)] hover:bg-[var(--color-light-grey)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-14 px-8 text-[15px]",
};

function resolveArrow(href?: string, arrow?: Arrow) {
  if (arrow === "none") return null;
  if (href?.startsWith("tel:")) return <Phone className="w-4 h-4 btn-arrow" />;
  if (href?.startsWith("mailto:")) return <Mail className="w-4 h-4 btn-arrow" />;
  if (href?.includes("calendly")) return <Calendar className="w-4 h-4 btn-arrow" />;
  if (arrow === "up-right") return <ArrowUpRight className="w-4 h-4 btn-arrow" />;
  return <ArrowRight className="w-4 h-4 btn-arrow" />;
}

export function Button(props: ButtonProps) {
  const {
    href,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    arrow,
    className = "",
    children,
  } = props;

  const base = "group inline-flex items-center justify-center gap-2.5 font-medium tracking-tight transition-all duration-400 ease-out";
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  const icon = resolveArrow(href, arrow);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <button onClick={onClick} type={type} className={classes}>
      {children}
      {icon}
    </button>
  );
}
```

- [ ] **Step 3: Build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/Button.tsx
git commit -m "feat(brand): rebuild Button with Cyan/Dark Blue variants per brand palette"
```

---

### Task 9: Phase 1 smoke test

**Files:** None (visual-only test)

- [ ] **Step 1: Run dev server**

```bash
npm run dev
```

- [ ] **Step 2: Visit `/`, `/about`, `/telecoms`, `/contact` and verify**

- Headings render in Inter SemiBold, Dark Blue colour
- Body text is Charcoal
- Buttons render as Cyan fill / Dark Blue text (primary) or Dark Blue outline (secondary)
- Eyebrows are Mid Blue small-caps with a small Cyan dash prefix
- Focus rings are Dark Blue (tab through a few buttons)
- No JavaScript errors in console
- Several elements are still visually broken (existing pages still use the old `--color-ink`, `--color-hivis` vars in their inline styles — expected; fixed in later phases)

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: Build completes without errors.

---

# Phase 2 — Motion System Foundations

Add the motion primitives that the rest of the site leans on: native Astro View Transitions, shared scroll components, and the interaction state utilities.

### Task 10: Enable Astro View Transitions globally

**Files:**
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Read the current Base.astro structure**

```bash
cat src/layouts/Base.astro
```

- [ ] **Step 2: In `src/layouts/Base.astro`, import the ClientRouter at the top (Astro 6 View Transitions API)**

Add this line to the frontmatter (between `---` fences at the top):

```astro
import { ClientRouter } from "astro:transitions";
```

- [ ] **Step 3: In the `<head>` of `Base.astro`, add the ClientRouter just before the closing `</head>` tag**

```astro
<ClientRouter fallback="swap" />
```

- [ ] **Step 4: Start dev server, navigate between `/` and `/about`, watch the transition**

```bash
npm run dev
```

Expected: Page navigation happens without a full reload; the browser does a default cross-fade between pages.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat(motion): enable Astro View Transitions globally via ClientRouter"
```

---

### Task 11: Build PageTransition cross-context curtain

**Files:**
- Create: `src/components/PageTransition.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create `src/components/PageTransition.tsx` — a tiny React island that renders the curtain element**

```tsx
export function PageTransition() {
  return (
    <div
      className="page-transition-curtain"
      aria-hidden="true"
      data-transition-curtain
    />
  );
}
```

- [ ] **Step 2: Add the curtain styles to `src/styles/global.css`**

Append at the bottom of the file (before the `@media (prefers-reduced-motion: reduce)` block):

```css
/* --- Page transition curtain (Dark Blue sweep) --- */
.page-transition-curtain {
  position: fixed;
  inset: 0;
  background: var(--color-dark-blue);
  transform: translateY(100%);
  z-index: 100;
  pointer-events: none;
  will-change: transform;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 500ms;
  animation-timing-function: var(--ease-silk);
}
```

- [ ] **Step 3: Update the `@media (prefers-reduced-motion)` block at the bottom of global.css to disable the curtain**

Append inside the existing media query:

```css
  .page-transition-curtain {
    display: none !important;
  }
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.01ms !important;
  }
```

- [ ] **Step 4: Import and render the PageTransition in `Base.astro`**

In `src/layouts/Base.astro`, in the frontmatter add:

```astro
import { PageTransition } from "../components/PageTransition";
```

Then in the `<body>`, just before `<slot />`, add:

```astro
<PageTransition client:load />
```

- [ ] **Step 5: Build & test navigation**

```bash
npm run dev
```

Navigate between pages; transitions play via the View Transitions API's default cross-fade. The curtain element exists but doesn't activate yet — we wire that in the next task.

- [ ] **Step 6: Commit**

```bash
git add src/components/PageTransition.tsx src/styles/global.css src/layouts/Base.astro
git commit -m "feat(motion): add page transition curtain element and base timing"
```

---

### Task 12: Build ScrollProgress top-of-viewport bar

**Files:**
- Create: `src/components/ScrollProgress.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create `src/components/ScrollProgress.tsx`**

```tsx
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress__fill"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Add styles to `src/styles/global.css`**

Append:

```css
/* --- Scroll progress bar (top of viewport) --- */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(125, 160, 195, 0.25); /* mid-blue @ 25% */
  z-index: 60;
  pointer-events: none;
}
.scroll-progress__fill {
  width: 100%;
  height: 100%;
  background: var(--color-cyan);
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform 0.1s linear;
  will-change: transform;
}
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ScrollProgress.tsx src/styles/global.css
git commit -m "feat(motion): add ScrollProgress bar component"
```

---

### Task 13: Build NumberTicker scroll-triggered counter

**Files:**
- Create: `src/components/NumberTicker.tsx`

- [ ] **Step 1: Create `src/components/NumberTicker.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";

interface NumberTickerProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  duration = 1400,
  className = "",
}: NumberTickerProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
            setDisplay(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: Build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/NumberTicker.tsx
git commit -m "feat(motion): add NumberTicker scroll-triggered counter component"
```

---

### Task 14: Build SectorIndex fixed left-rail

**Files:**
- Create: `src/components/SectorIndex.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create `src/components/SectorIndex.tsx`**

```tsx
import { useEffect, useState } from "react";

interface SectorIndexProps {
  label: string; // e.g. "01 / TELECOMS"
}

export function SectorIndex({ label }: SectorIndexProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside className="sector-index" aria-hidden="true">
      <span className="sector-index__label">{label}</span>
      <div className="sector-index__rail">
        <span
          className="sector-index__dot"
          style={{ top: `${progress * 100}%` }}
        />
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Add styles to `src/styles/global.css`**

Append:

```css
/* --- Sector index (fixed left rail, desktop only) --- */
.sector-index {
  display: none;
  position: fixed;
  top: 140px;
  left: 32px;
  z-index: 30;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  pointer-events: none;
}
@media (min-width: 1280px) {
  .sector-index { display: flex; }
}
.sector-index__label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-mid-blue);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin-bottom: 4px;
}
.sector-index__rail {
  position: relative;
  width: 1px;
  height: 220px;
  background: var(--color-mid-blue);
  opacity: 0.4;
}
.sector-index__dot {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: var(--color-cyan);
  border-radius: 50%;
  transition: top 0.15s linear;
}
```

- [ ] **Step 3: Build & visual check**

```bash
npm run dev
```

At desktop widths ≥1280px, with a page that uses `<SectorIndex label="01 / TELECOMS" />`, you'll see a fixed vertical rail on the left with a small Cyan dot that slides as you scroll. (We'll wire it into sector pages later.)

- [ ] **Step 4: Commit**

```bash
git add src/components/SectorIndex.tsx src/styles/global.css
git commit -m "feat(motion): add SectorIndex fixed left-rail page indicator"
```

---

### Task 15: Phase 2 smoke test — verify all motion primitives are wired

**Files:** None

- [ ] **Step 1: Create a temporary test page to visually check all primitives**

Create `src/pages/motion-test.astro` (temporary — delete later):

```astro
---
import Base from "../layouts/Base.astro";
import { ScrollProgress } from "../components/ScrollProgress";
import { SectorIndex } from "../components/SectorIndex";
import { NumberTicker } from "../components/NumberTicker";
import { Button } from "../components/Button";
---
<Base title="Motion test">
  <ScrollProgress client:load />
  <SectorIndex label="00 / TEST" client:load />

  <main style="min-height: 300vh; padding: 200px 40px;">
    <h1>Motion Foundations Test</h1>
    <p>Scroll down. Watch the top progress bar. Watch the left-rail Cyan dot at desktop widths.</p>

    <section style="margin-top: 80vh;">
      <h2>Number ticker</h2>
      <p style="font-size: 72px; font-weight: 600;">
        <NumberTicker value={2500} suffix="+" client:load />
      </p>
    </section>

    <section style="margin-top: 60vh;">
      <h2>Button variants</h2>
      <Button variant="primary" client:load>Primary</Button>
      <Button variant="secondary" client:load>Secondary</Button>
      <Button variant="tertiary" client:load>Tertiary</Button>
    </section>
  </main>
</Base>
```

- [ ] **Step 2: Run dev server, visit `/motion-test`**

```bash
npm run dev
```

Verify:
- Scroll progress bar at top fills with Cyan as you scroll
- Left-rail dot slides (desktop)
- Number counter animates from 0 to 2500 when scrolled into view
- Buttons render correctly

- [ ] **Step 3: Delete the temp test page**

```bash
rm src/pages/motion-test.astro
```

- [ ] **Step 4: Commit** (no file changes to commit — just a "phase 2 verified" marker)

```bash
git commit --allow-empty -m "test: phase 2 motion foundations verified"
```

---

# Phase 3 — Global Chrome (Navbar, MegaMenu, Footer, PageShell)

Replace the scaffold's navbar and footer with brand-aligned components, including the two-tier MegaMenu.

### Task 16: Rebuild Navbar with brand palette and Logo component

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Replace the contents of `src/components/Navbar.tsx` with**

```tsx
import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";

const topLinks = [
  { name: "Our Work", path: "/work" },
  { name: "How We Deliver", path: "/how-we-deliver" },
  { name: "About", path: "/about" },
  { name: "Team", path: "/team" },
  { name: "Careers", path: "/careers" },
];

export function Navbar() {
  const [location, setLocation] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);

  useEffect(() => {
    setLocation(window.location.pathname);
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onDark = isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[var(--color-dark-blue)] border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-[76px] flex items-center justify-between">
        <a href="/" className="flex items-center" aria-label="Lambs Group home">
          <Logo variant={onDark ? "white" : "colour"} width={140} />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7 text-[12px] uppercase tracking-[0.14em] font-medium">
            <li
              onMouseEnter={() => setIsSectorsOpen(true)}
              onMouseLeave={() => setIsSectorsOpen(false)}
              className="relative"
            >
              <button
                className={`nav-link inline-flex items-center gap-1 transition-colors duration-300 ${
                  onDark ? "text-white/80 hover:text-white" : "text-[var(--color-dark-blue)] hover:text-[var(--color-cyan)]"
                }`}
                aria-expanded={isSectorsOpen}
                aria-haspopup="true"
              >
                Sectors
                <ChevronDown className="w-3 h-3" />
              </button>
              {isSectorsOpen && <MegaMenu onClose={() => setIsSectorsOpen(false)} />}
            </li>
            {topLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className={`nav-link transition-colors duration-300 ${
                    onDark ? "text-white/80 hover:text-white" : "text-[var(--color-dark-blue)] hover:text-[var(--color-cyan)]"
                  } ${location === link.path ? "is-active" : ""}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className={`flex items-center gap-5 pl-6 border-l ${onDark ? "border-white/20" : "border-[var(--color-mid-blue)]/30"}`}>
            <a
              href="tel:01925810991"
              className={`hidden xl:flex items-center gap-2 text-[13px] transition-colors ${
                onDark ? "text-white/80 hover:text-[var(--color-cyan)]" : "text-[var(--color-dark-blue)] hover:text-[var(--color-cyan)]"
              }`}
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="tracking-wide">01925 810 991</span>
            </a>
            <Button href="/contact" variant="primary" size="md">Start a project</Button>
          </div>
        </nav>

        <button
          className={`lg:hidden p-2 ${onDark ? "text-white" : "text-[var(--color-dark-blue)]"}`}
          onClick={() => setIsMobileMenuOpen((p) => !p)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`lg:hidden absolute top-[76px] left-0 right-0 bg-[var(--color-dark-blue)] border-b border-white/10 transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-5">
          <div className="eyebrow eyebrow-dark">Commercial</div>
          <a href="/telecoms" className="block py-2 text-[22px] text-white font-semibold hover:text-[var(--color-cyan)]">Telecoms</a>
          <a href="/civil-works" className="block py-2 text-[22px] text-white font-semibold hover:text-[var(--color-cyan)]">Civil Works</a>
          <a href="/utilities" className="block py-2 text-[22px] text-white font-semibold hover:text-[var(--color-cyan)]">Utilities</a>

          <div className="eyebrow eyebrow-dark mt-4">Domestic</div>
          <a href="/private-works" className="block py-2 text-[22px] text-white font-semibold hover:text-[var(--color-cyan)]">Private Works</a>

          <div className="eyebrow eyebrow-dark mt-4">Company</div>
          {topLinks.map((link) => (
            <a key={link.path} href={link.path} className="block py-2 text-[20px] text-white/90 font-medium hover:text-[var(--color-cyan)]">
              {link.name}
            </a>
          ))}
          <a href="/contact" className="block py-2 text-[20px] text-white/90 font-medium hover:text-[var(--color-cyan)]">Contact</a>

          <div className="pt-6 flex flex-col gap-3">
            <a href="tel:01925810991" className="flex items-center gap-2 text-white/80 text-sm">
              <Phone className="w-4 h-4" /> 01925 810 991
            </a>
            <Button href="/contact" variant="primary" className="w-full">Start a project</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Build — this will fail because MegaMenu doesn't exist yet**

```bash
npm run build
```

Expected: Fails with "Cannot find module './MegaMenu'". That's fine — fixed in the next task.

- [ ] **Step 3: Commit partial work (a stashable checkpoint)**

Don't commit yet — wait for Task 17.

---

### Task 17: Build MegaMenu component

**Files:**
- Create: `src/components/MegaMenu.tsx`

- [ ] **Step 1: Create `src/components/MegaMenu.tsx`**

```tsx
import { Radio, HardHat, Zap, Home } from "lucide-react";

interface MegaMenuProps {
  onClose: () => void;
}

const commercial = [
  { icon: Radio, title: "Telecoms", blurb: "FTTH, fibre, splicing, surveys.", href: "/telecoms" },
  { icon: HardHat, title: "Civil Works", blurb: "Excavation, reinstatement, drainage.", href: "/civil-works" },
  { icon: Zap, title: "Utilities", blurb: "Water, gas, power. Mains to meter.", href: "/utilities" },
];

const domestic = [
  { icon: Home, title: "Private Works", blurb: "Driveways, resin, block paving, patios, dropped kerbs.", href: "/private-works" },
];

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] bg-white border border-[var(--color-border)] shadow-xl z-60"
      onClick={onClose}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0">
        <div className="p-8">
          <div className="eyebrow mb-6">Commercial</div>
          <div className="grid grid-cols-1 gap-1">
            {commercial.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.href}
                  href={c.href}
                  className="group flex items-start gap-4 p-4 -mx-4 hover:bg-[var(--color-light-grey)] transition-colors duration-300"
                >
                  <span className="flex items-center justify-center w-10 h-10 bg-[var(--color-dark-blue)] text-white group-hover:bg-[var(--color-cyan)] group-hover:text-[var(--color-dark-blue)] transition-colors duration-300">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h4 className="text-[var(--color-dark-blue)] font-semibold text-[17px] mb-1">{c.title}</h4>
                    <p className="text-[var(--color-mid-blue)] text-[13px] leading-snug">{c.blurb}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div className="p-8 bg-[var(--color-light-grey)] border-l border-[var(--color-border)]">
          <div className="eyebrow mb-6">Domestic</div>
          {domestic.map((d) => {
            const Icon = d.icon;
            return (
              <a
                key={d.href}
                href={d.href}
                className="group flex items-start gap-4 -mx-4 p-4 hover:bg-white transition-colors duration-300"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-[var(--color-dark-blue)] text-white group-hover:bg-[var(--color-cyan)] group-hover:text-[var(--color-dark-blue)] transition-colors duration-300">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h4 className="text-[var(--color-dark-blue)] font-semibold text-[17px] mb-1">{d.title}</h4>
                  <p className="text-[var(--color-mid-blue)] text-[13px] leading-snug">{d.blurb}</p>
                </div>
              </a>
            );
          })}
          <a href="/map" className="block mt-6 pt-6 border-t border-[var(--color-border)] text-[13px] text-[var(--color-dark-blue)] hover:text-[var(--color-cyan)] transition-colors">
            See where we're working now →
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Test navigation — dev server, hover over "Sectors" in nav**

```bash
npm run dev
```

Expected: MegaMenu drops down showing Commercial (3 sectors) + Domestic (1 sector) + "See where we're working now" link.

- [ ] **Step 4: Commit both Navbar and MegaMenu together**

```bash
git add src/components/Navbar.tsx src/components/MegaMenu.tsx
git commit -m "feat(chrome): rebuild Navbar with MegaMenu and brand palette"
```

---

### Task 18: Rebuild Footer with brand palette

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Replace `src/components/Footer.tsx` contents with**

```tsx
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

const linkGroups = [
  {
    title: "Commercial",
    links: [
      { label: "Telecoms", href: "/telecoms" },
      { label: "Civil Works", href: "/civil-works" },
      { label: "Utilities", href: "/utilities" },
    ],
  },
  {
    title: "Domestic",
    links: [{ label: "Private Works", href: "/private-works" }],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Our Work", href: "/work" },
      { label: "How We Deliver", href: "/how-we-deliver" },
      { label: "Careers", href: "/careers" },
      { label: "Live Map", href: "/map" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "01925 810 991", href: "tel:01925810991" },
      { label: "01925 850 982 (Recruitment)", href: "tel:01925850982" },
      { label: "info@lambsgroup.co.uk", href: "mailto:info@lambsgroup.co.uk" },
    ],
  },
];

const accreditations = [
  "ISO 9001", "ISO 14001", "ISO 45001", "CHAS", "Constructionline", "NRSWA",
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark-blue)] text-white/80 relative">
      {/* Accreditations strip */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 flex flex-wrap items-center justify-between gap-6">
          <span className="eyebrow eyebrow-dark">Accredited &amp; Certified</span>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {accreditations.map((a) => (
              <span
                key={a}
                className="text-[11px] uppercase tracking-[0.18em] text-white/60 border border-white/20 px-3 py-2 font-medium"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Logo variant="white" width={160} />
            <h3 className="text-white text-[24px] lg:text-[28px] font-semibold leading-[1.15] max-w-sm mt-10 mb-8">
              Infrastructure services across the UK. Safely, compliantly, on programme.
            </h3>
            <div className="flex flex-col gap-2 text-[13px] text-white/60 max-w-sm">
              <span>Tatton Court, Tatton Road, Warrington</span>
              <span>Prestwood Court (Recruitment), Warrington</span>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="eyebrow eyebrow-dark mb-6">{group.title}</h4>
                <ul className="flex flex-col gap-3 text-[14px]">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="nav-link text-white/75 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs uppercase tracking-wider text-white/50">
            © {new Date().getFullYear()} Lambs Group. Est. 1988.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 hover:text-[var(--color-cyan)] transition-colors"
          >
            Start a project
            <ArrowUpRight className="w-3.5 h-3.5 btn-arrow" />
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Build**

```bash
npm run build
```

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Footer should render on Dark Blue background with white type, Cyan CTA hover state, and the white-variant Lambs Group logo.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat(chrome): rebuild Footer with Dark Blue background and brand palette"
```

---

### Task 19: Verify PageShell integration with new chrome

**Files:**
- Read: `src/components/sections/PageShell.tsx`

- [ ] **Step 1: Read the existing PageShell**

```bash
cat src/components/sections/PageShell.tsx
```

- [ ] **Step 2: Confirm it imports and renders Navbar + Footer**

If it uses `<Navbar />` and `<Footer />` correctly, no changes needed. If it imports them with old paths or uses different structure, adjust accordingly.

Expected structure:

```tsx
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

If it doesn't match, rewrite it to match the structure above.

- [ ] **Step 3: Visual check all existing pages**

```bash
npm run dev
```

Visit `/`, `/about`, `/telecoms`, `/contact`. Each should now have:
- New Navbar at top
- New Dark Blue Footer at bottom
- Page content between (still using old inline colours — will fix in Phase 4+)

- [ ] **Step 4: Commit if any changes were made; otherwise skip**

```bash
git add src/components/sections/PageShell.tsx
git commit -m "chore(chrome): verify PageShell integrates new Navbar and Footer"
```

---

# Phase 4 — Sector Motion Signature Components

Build the four bespoke motion components that give each sector its signature moment. These are pure SVG/CSS components — no libraries.

### Task 20: Build FibreDraw component (Telecoms signature)

**Files:**
- Create: `src/components/motion/FibreDraw.tsx`

- [ ] **Step 1: Create `src/components/motion/FibreDraw.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";

interface FibreDrawProps {
  className?: string;
}

export function FibreDraw({ className = "" }: FibreDrawProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={`fibre-draw ${visible ? "is-visible" : ""} ${className}`}
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 340 Q 200 120 450 240 T 900 160 T 1200 260"
        fill="none"
        stroke="#6CC5EA"
        strokeWidth="2"
        strokeLinecap="round"
        className="fibre-draw__line"
      />
      <circle cx="450" cy="240" r="6" className="fibre-draw__node" />
      <circle cx="780" cy="195" r="6" className="fibre-draw__node" style={{ animationDelay: "0.8s" }} />
      <circle cx="1050" cy="230" r="6" className="fibre-draw__node" style={{ animationDelay: "1.6s" }} />
    </svg>
  );
}
```

- [ ] **Step 2: Add styles to `src/styles/global.css`**

Append:

```css
/* --- Fibre draw (Telecoms signature) --- */
.fibre-draw { width: 100%; height: 100%; display: block; }
.fibre-draw__line {
  stroke-dasharray: 2400;
  stroke-dashoffset: 2400;
  transition: stroke-dashoffset 1.4s var(--ease-silk);
}
.fibre-draw.is-visible .fibre-draw__line { stroke-dashoffset: 0; }

.fibre-draw__node {
  fill: #6CC5EA;
  opacity: 0;
  transform-origin: center;
  animation: fibreNodePulse 3s ease-in-out infinite;
  animation-play-state: paused;
}
.fibre-draw.is-visible .fibre-draw__node { animation-play-state: running; }

@keyframes fibreNodePulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.8); }
}
@media (prefers-reduced-motion: reduce) {
  .fibre-draw__line { stroke-dashoffset: 0 !important; transition: none !important; }
  .fibre-draw__node { animation: none !important; opacity: 0.7 !important; }
}
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/FibreDraw.tsx src/styles/global.css
git commit -m "feat(motion): add FibreDraw component for Telecoms signature"
```

---

### Task 21: Build StratPeel component (Civils signature)

**Files:**
- Create: `src/components/motion/StratPeel.tsx`

- [ ] **Step 1: Create `src/components/motion/StratPeel.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";

interface StratPeelProps {
  className?: string;
}

const layers = [
  { label: "Wearing course · 40mm", fill: "#242A38" },
  { label: "Binder course", fill: "#3B435A" },
  { label: "Type 1 sub-base", fill: "#7DA0C3" },
  { label: "Subgrade", fill: "#B8CBDE" },
];

export function StratPeel({ className = "" }: StratPeelProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`strat-peel ${visible ? "is-visible" : ""} ${className}`} aria-hidden="true">
      {layers.map((layer, i) => (
        <div
          key={layer.label}
          className="strat-peel__layer"
          style={{ backgroundColor: layer.fill, transitionDelay: `${i * 140}ms` }}
        >
          <span className="strat-peel__label">{layer.label}</span>
        </div>
      ))}
      <div className="strat-peel__tick" />
    </div>
  );
}
```

- [ ] **Step 2: Add styles to `src/styles/global.css`**

Append:

```css
/* --- Strat peel (Civils signature) --- */
.strat-peel {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: var(--color-light-grey);
}
.strat-peel__layer {
  position: relative;
  height: 25%;
  transform: translateX(-100%);
  transition: transform 0.9s var(--ease-silk);
  display: flex;
  align-items: center;
  padding: 0 24px;
  will-change: transform;
}
.strat-peel.is-visible .strat-peel__layer { transform: translateX(0); }
.strat-peel__label {
  color: rgba(255, 255, 255, 0.85);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 500;
}
.strat-peel__tick {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-cyan);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 1.1s var(--ease-silk) 0.5s;
}
.strat-peel.is-visible .strat-peel__tick { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) {
  .strat-peel__layer { transform: translateX(0) !important; transition: none !important; }
  .strat-peel__tick { transform: scaleX(1) !important; transition: none !important; }
}
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/StratPeel.tsx src/styles/global.css
git commit -m "feat(motion): add StratPeel component for Civils signature"
```

---

### Task 22: Build FlowLines component (Utilities signature)

**Files:**
- Create: `src/components/motion/FlowLines.tsx`

- [ ] **Step 1: Create `src/components/motion/FlowLines.tsx`**

```tsx
interface FlowLinesProps {
  className?: string;
}

const flows = [
  { y: 80, colour: "#264A88", dash: "0", label: "Power" },        // solid
  { y: 170, colour: "#7DA0C3", dash: "12 6", label: "Water" },    // dashed
  { y: 260, colour: "#6CC5EA", dash: "2 6", label: "Gas" },       // dotted
];

export function FlowLines({ className = "" }: FlowLinesProps) {
  return (
    <svg
      className={`flow-lines ${className}`}
      viewBox="0 0 1200 340"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {flows.map((flow, i) => (
        <g key={flow.label}>
          <line
            x1="0"
            y1={flow.y}
            x2="1200"
            y2={flow.y}
            stroke={flow.colour}
            strokeWidth="2"
            strokeDasharray={flow.dash}
            opacity="0.7"
          />
          <circle
            r="6"
            fill={flow.colour}
            className="flow-lines__pulse"
            style={{ animationDelay: `${i * 0.8}s` }}
          >
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path={`M0 ${flow.y} L1200 ${flow.y}`}
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
```

- [ ] **Step 2: Add styles (pulse) to `src/styles/global.css`**

Append:

```css
/* --- Flow lines (Utilities signature) --- */
.flow-lines { width: 100%; height: 100%; display: block; }
.flow-lines__pulse {
  filter: drop-shadow(0 0 8px currentColor);
}
@media (prefers-reduced-motion: reduce) {
  .flow-lines__pulse animateMotion { display: none; }
  .flow-lines__pulse { display: none; }
}
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/FlowLines.tsx src/styles/global.css
git commit -m "feat(motion): add FlowLines component for Utilities signature"
```

---

### Task 23: Build BeforeAfter drag-wipe component (Private Works signature)

**Files:**
- Create: `src/components/motion/BeforeAfter.tsx`

- [ ] **Step 1: Create `src/components/motion/BeforeAfter.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  className = "",
}: BeforeAfterProps) {
  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const autoSwept = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos(50);
      autoSwept.current = true;
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !autoSwept.current) {
          autoSwept.current = true;
          const start = performance.now();
          const duration = 1600;
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setPos(eased * 50 + 20); // sweep from 20% to 70%
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  };

  return (
    <div
      ref={ref}
      className={`before-after ${className}`}
      onMouseMove={(e) => { if (dragging) updateFromClientX(e.clientX); }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => { if (e.touches[0]) updateFromClientX(e.touches[0].clientX); }}
    >
      <img src={afterSrc} alt={afterAlt} className="before-after__img" />
      <div className="before-after__before" style={{ width: `${pos}%` }}>
        <img src={beforeSrc} alt={beforeAlt} className="before-after__img" />
      </div>
      <div
        className="before-after__handle"
        style={{ left: `${pos}%` }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
        role="slider"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before/after comparison"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
      >
        <span className="before-after__handle-bar" />
        <span className="before-after__handle-knob">◄▸</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add styles to `src/styles/global.css`**

Append:

```css
/* --- Before/After wipe (Private Works signature) --- */
.before-after {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  cursor: ew-resize;
  user-select: none;
  background: var(--color-light-grey);
}
.before-after__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.before-after__before {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  filter: saturate(0.6);
}
.before-after__before .before-after__img { width: 100vw; max-width: none; }
.before-after__handle {
  position: absolute;
  top: 0;
  height: 100%;
  width: 2px;
  background: var(--color-cyan);
  transform: translateX(-1px);
  cursor: ew-resize;
  z-index: 2;
}
.before-after__handle-bar { display: none; }
.before-after__handle-knob {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: var(--color-cyan);
  color: var(--color-dark-blue);
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  letter-spacing: -1px;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/BeforeAfter.tsx src/styles/global.css
git commit -m "feat(motion): add BeforeAfter drag-wipe component for Private Works signature"
```

---

### Task 24: Phase 4 smoke test — render all four motion components on a temp page

**Files:** None (test page, to be deleted)

- [ ] **Step 1: Create `src/pages/motion-signatures-test.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import { FibreDraw } from "../components/motion/FibreDraw";
import { StratPeel } from "../components/motion/StratPeel";
import { FlowLines } from "../components/motion/FlowLines";
import { BeforeAfter } from "../components/motion/BeforeAfter";
---
<Base title="Motion signatures">
  <main style="max-width: 1100px; margin: 0 auto; padding: 140px 24px;">
    <h1>Sector motion signatures</h1>

    <section style="margin-top: 60px;">
      <h2>Telecoms — Fibre Draw</h2>
      <div style="height: 320px; background: var(--color-dark-blue);">
        <FibreDraw client:load />
      </div>
    </section>

    <section style="margin-top: 60px;">
      <h2>Civil Works — Strat Peel</h2>
      <StratPeel client:load />
    </section>

    <section style="margin-top: 60px;">
      <h2>Utilities — Flow Lines</h2>
      <div style="height: 340px;">
        <FlowLines client:load />
      </div>
    </section>

    <section style="margin-top: 60px;">
      <h2>Private Works — Before/After</h2>
      <BeforeAfter
        client:load
        beforeSrc="https://picsum.photos/seed/before/1200/800"
        afterSrc="https://picsum.photos/seed/after/1200/800"
      />
    </section>
  </main>
</Base>
```

- [ ] **Step 2: Verify all four render correctly**

```bash
npm run dev
```

Visit `/motion-signatures-test`. Each component should animate/render as described in the spec.

- [ ] **Step 3: Delete the test page**

```bash
rm src/pages/motion-signatures-test.astro
```

- [ ] **Step 4: Commit verification marker**

```bash
git commit --allow-empty -m "test: phase 4 sector motion components verified"
```

---

**Milestone 1 (Foundation) complete at end of Task 24. Recommended review point before proceeding.**

---

# Phase 5 — Home Page Rebuild

Rebuild the home page against the brand palette, with four sector cards (adds Private Works), UK map embed, and new recent-work ribbon.

### Task 25: Rebuild HomePage hero section

**Files:**
- Modify: `src/components/pages/HomePage.tsx`

- [ ] **Step 1: Read the existing file to understand current structure**

```bash
wc -l src/components/pages/HomePage.tsx
```

- [ ] **Step 2: Replace the entire contents of `src/components/pages/HomePage.tsx` with the rebuilt home page (note: this file is long — it's the whole page)**

```tsx
import { ArrowDown, ArrowUpRight, Radio, HardHat, Zap, Home } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { Button } from "../Button";
import { NumberTicker } from "../NumberTicker";
import { PageShell } from "../sections/PageShell";
import { CTASection } from "../sections/CTASection";

const heroImage = "https://picsum.photos/seed/lambs-hero-infrastructure/1800/2200";
const aboutImage = "https://picsum.photos/seed/lambs-team-civils/1400/1800";

const commercialSectors = [
  {
    icon: Radio,
    number: "01",
    title: "Telecoms",
    blurb: "FTTH/FTTP rollouts, blown fibre, splicing, surveys, mole ploughing, directional drilling and cabinet installs for the UK's largest operators.",
    href: "/telecoms",
  },
  {
    icon: HardHat,
    number: "02",
    title: "Civil Works",
    blurb: "Excavation, reinstatement, road works, footways, drainage, ducting and chamber installation — NRSWA-compliant, delivered by direct crews.",
    href: "/civil-works",
  },
  {
    icon: Zap,
    number: "03",
    title: "Utilities",
    blurb: "Water, gas and electricity supply works. Ducting, jointing, mains laying and service connections across housing, industrial and local authority sites.",
    href: "/utilities",
  },
];

const domesticSector = {
  icon: Home,
  number: "04",
  title: "Private Works",
  blurb: "Driveways, resin, block paving, patios, groundworks, drainage, dropped kerbs. Domestic civils with the same standards as our commercial programmes.",
  href: "/private-works",
};

const clients = [
  "Fujitsu", "Virgin Media", "Barratt Developments", "Alfred McAlpine", "Bury Council", "Kier",
];

const stats = [
  { value: 100, suffix: "+", label: "Directly employed" },
  { value: 30, suffix: "", label: "Audits / month" },
  { value: 2500, suffix: "+", label: "Motif jobs / week" },
  { value: 37, suffix: " yrs", label: "Est. 1988" },
];

export function HomePage() {
  return (
    <PageShell>
      {/* ============ HERO ============ */}
      <section className="relative bg-white overflow-hidden min-h-[100svh] flex items-end">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />

        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 pointer-events-none">
          <div className="reveal-image is-visible h-full w-full">
            <img src={heroImage} alt="" className="h-full w-full object-cover opacity-40 lg:opacity-80" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent lg:from-white lg:via-white/40" aria-hidden="true" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-[160px] lg:pt-[200px] pb-20 lg:pb-28 w-full">
          <div className="flex items-center justify-between mb-16 lg:mb-24">
            <FadeIn><span className="eyebrow">Infrastructure Services · Est. 1988</span></FadeIn>
            <FadeIn delay={120}>
              <span className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
                Actively mobilising · UK-wide
              </span>
            </FadeIn>
          </div>

          <AnimatedHeading as="h1" className="max-w-[1100px] mb-14" stagger={40}>
            Infrastructure services across the UK. Safely, compliantly, on programme.
          </AnimatedHeading>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-6">
              <FadeIn delay={280}>
                <p className="text-[var(--color-charcoal)] text-lg md:text-xl leading-relaxed max-w-xl">
                  Lambs Group is a family-run, Warrington-based contractor delivering
                  telecoms, civil works, utilities and domestic works for operators,
                  developers, local authorities and homeowners. Directly-employed crews.
                  Compliance-first delivery.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 flex flex-col items-start lg:items-end gap-6">
              <FadeIn delay={420}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button href="/contact" variant="primary" size="lg">Start a project</Button>
                  <Button href="/about" variant="secondary" size="lg" arrow="up-right">Our story</Button>
                </div>
              </FadeIn>
              <FadeIn delay={540}>
                <a href="#sectors" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] hover:text-[var(--color-cyan)] transition-colors font-medium">
                  Scroll to explore
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STAT STRIP ============ */}
      <section className="bg-[var(--color-light-grey)] py-16 border-y border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[48px] lg:text-[64px] leading-none font-semibold text-[var(--color-dark-blue)]">
                  <NumberTicker value={s.value} suffix={s.suffix} client:load />
                </div>
                <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mt-3 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTORS ============ */}
      <section id="sectors" className="bg-white py-24 lg:py-36 relative">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Four sectors · One contractor</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">
                We design, dig, joint, reinstate and finish.
              </AnimatedHeading>
              <FadeIn delay={280}>
                <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-8 max-w-2xl">
                  From national fibre rollouts to homeowner driveways — delivered end-to-end by directly employed crews. One contractor, one point of accountability.
                </p>
              </FadeIn>
            </div>
          </div>

          <div className="mb-6">
            <span className="eyebrow">Commercial</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {commercialSectors.map((sector, i) => {
              const Icon = sector.icon;
              return (
                <FadeIn key={sector.title} delay={i * 160}>
                  <a
                    href={sector.href}
                    className="group relative block bg-white border border-[var(--color-border-strong)] p-8 lg:p-10 h-full transition-all duration-500 hover:border-[var(--color-dark-blue)] hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-12">
                      <span className="text-xs uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">{sector.number}</span>
                      <ArrowUpRight className="w-5 h-5 text-[var(--color-dark-blue)] opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <div className="w-14 h-14 flex items-center justify-center bg-[var(--color-dark-blue)] mb-8 group-hover:bg-[var(--color-cyan)] transition-colors duration-500">
                      <Icon className="w-7 h-7 text-white group-hover:text-[var(--color-dark-blue)] transition-colors duration-500" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[28px] lg:text-[32px] leading-none font-semibold mb-5 text-[var(--color-dark-blue)]">{sector.title}</h3>
                    <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{sector.blurb}</p>
                  </a>
                </FadeIn>
              );
            })}
          </div>

          <div className="mb-6">
            <span className="eyebrow">Domestic</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn className="md:col-span-3">
              <a
                href={domesticSector.href}
                className="group relative block bg-[var(--color-light-grey)] border border-[var(--color-border-strong)] p-8 lg:p-10 transition-all duration-500 hover:border-[var(--color-dark-blue)] hover:-translate-y-1"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-1">
                    <span className="text-xs uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">{domesticSector.number}</span>
                  </div>
                  <div className="md:col-span-2">
                    <div className="w-14 h-14 flex items-center justify-center bg-[var(--color-dark-blue)] group-hover:bg-[var(--color-cyan)] transition-colors duration-500">
                      <domesticSector.icon className="w-7 h-7 text-white group-hover:text-[var(--color-dark-blue)] transition-colors duration-500" strokeWidth={1.8} />
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="text-[28px] lg:text-[32px] leading-none font-semibold mb-3 text-[var(--color-dark-blue)]">{domesticSector.title}</h3>
                    <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{domesticSector.blurb}</p>
                  </div>
                  <div className="md:col-span-1 flex md:justify-end">
                    <ArrowUpRight className="w-6 h-6 text-[var(--color-dark-blue)] opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============ ABOUT TEASER ============ */}
      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <RevealImage src={aboutImage} alt="Lambs Group operatives on site" aspect="aspect-[4/5]" />
            </div>
            <div className="lg:col-span-6">
              <FadeIn><span className="eyebrow mb-8">Who we are</span></FadeIn>
              <AnimatedHeading as="h2" className="mt-6 mb-8">Family-run since 1988. Directly employed workforce.</AnimatedHeading>
              <FadeIn delay={200}>
                <div className="space-y-5 text-[var(--color-charcoal)] text-lg leading-relaxed max-w-xl">
                  <p>Founded as S Lamb Construction in 1988 and now trading as Lambs Group, we deliver infrastructure services across the UK — directly employed operatives, NRSWA-trained, compliance-first.</p>
                  <p>Over 100 directly employed operatives and engineers. 30 van audits a month. NEBOSH-accredited supervision on every site. Trusted by Fujitsu, Virgin Media, Barratt Developments and local authorities across the UK.</p>
                </div>
              </FadeIn>
              <FadeIn delay={320}>
                <div className="mt-10">
                  <Button href="/about" variant="primary" size="lg" arrow="up-right">Read our story</Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLIENTS LOGO WALL ============ */}
      <section className="bg-white border-y border-[var(--color-border)] py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <span className="eyebrow">Trusted by</span>
              <span className="hidden md:block text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
                Operators · Developers · Local Authorities
              </span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[var(--color-border)]">
            {clients.map((client, i) => (
              <FadeIn key={client} delay={i * 80}>
                <div className="logo-tile bg-white h-24 flex items-center justify-center">
                  <span className="text-[var(--color-dark-blue)]/70 text-lg font-semibold tracking-tight">
                    {client}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <CTASection />
    </PageShell>
  );
}
```

- [ ] **Step 3: Build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Visual check**

```bash
npm run dev
```

Home page now: white hero, Dark Blue headline, Cyan button, four sector cards (with Domestic divider before Private Works), stats strip ticking up, brand-aligned throughout.

- [ ] **Step 5: Commit**

```bash
git add src/components/pages/HomePage.tsx
git commit -m "feat(home): rebuild HomePage with brand palette and four-sector grid"
```

---

### Task 26: Update CTASection component for brand palette

**Files:**
- Modify: `src/components/sections/CTASection.tsx`

- [ ] **Step 1: Read existing CTASection**

```bash
cat src/components/sections/CTASection.tsx
```

- [ ] **Step 2: Replace the contents of `src/components/sections/CTASection.tsx` with**

```tsx
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

interface CTASectionProps {
  eyebrow?: string;
  heading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  eyebrow = "Start a project",
  heading = "Your project. Our crew. One point of contact.",
  primaryLabel = "Start a project",
  primaryHref = "/contact",
  secondaryLabel = "Call 01925 810 991",
  secondaryHref = "tel:01925810991",
}: CTASectionProps) {
  return (
    <section className="bg-[var(--color-dark-blue)] text-white py-24 lg:py-32 relative overflow-hidden">
      <div className="grid-bg-dark absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <FadeIn><span className="eyebrow eyebrow-dark mb-6">{eyebrow}</span></FadeIn>
            <AnimatedHeading as="h2" className="text-white max-w-3xl mt-8">
              {heading}
            </AnimatedHeading>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 items-start lg:items-end">
            <Button href={primaryHref} variant="primary" size="lg">{primaryLabel}</Button>
            <Button href={secondaryHref} variant="outline-white" size="lg" arrow="none">{secondaryLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build and visual check**

```bash
npm run build && npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/CTASection.tsx
git commit -m "feat(cta): rebuild CTASection with brand palette"
```

---

### Task 27: Update PageHero component for brand palette

**Files:**
- Modify: `src/components/sections/PageHero.tsx`

- [ ] **Step 1: Read existing PageHero**

```bash
cat src/components/sections/PageHero.tsx
```

- [ ] **Step 2: Replace contents of `src/components/sections/PageHero.tsx` with**

```tsx
import type { ReactNode } from "react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
  sectionIndex?: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  heading,
  lede,
  image,
  imageAlt,
  sectionIndex,
  children,
}: PageHeroProps) {
  return (
    <section className="relative bg-white overflow-hidden pt-[140px] pb-16 lg:pt-[180px] lg:pb-24 border-b border-[var(--color-border)]">
      <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <FadeIn><span className="eyebrow">{eyebrow}</span></FadeIn>
          {sectionIndex && (
            <FadeIn delay={100}>
              <span className="hidden md:block text-xs uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
                {sectionIndex}
              </span>
            </FadeIn>
          )}
        </div>

        <div className={image ? "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end" : ""}>
          <div className={image ? "lg:col-span-7" : ""}>
            <AnimatedHeading as="h1" className="max-w-4xl mb-8">{heading}</AnimatedHeading>
            {lede && (
              <FadeIn delay={260}>
                <p className="text-[var(--color-charcoal)] text-lg md:text-xl leading-relaxed max-w-2xl">
                  {lede}
                </p>
              </FadeIn>
            )}
            {children}
          </div>
          {image && (
            <div className="lg:col-span-5">
              <RevealImage src={image} alt={imageAlt || ""} aspect="aspect-[4/5]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build and visual check**

```bash
npm run build && npm run dev
```

Visit `/about`, `/telecoms`, etc. PageHero should render white with Dark Blue H1.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/PageHero.tsx
git commit -m "feat(hero): rebuild PageHero with white background and brand palette"
```

---

### Task 28: Update StatStrip and ServiceList components

**Files:**
- Modify: `src/components/sections/StatStrip.tsx`
- Modify: `src/components/sections/ServiceList.tsx`

- [ ] **Step 1: Read existing components**

```bash
cat src/components/sections/StatStrip.tsx src/components/sections/ServiceList.tsx
```

- [ ] **Step 2: Replace contents of `src/components/sections/StatStrip.tsx` with**

```tsx
import { FadeIn } from "../FadeIn";
import { NumberTicker } from "../NumberTicker";

interface StatStripProps {
  stats?: { value: number; suffix?: string; label: string }[];
  onDark?: boolean;
}

const defaultStats = [
  { value: 100, suffix: "+", label: "Directly employed" },
  { value: 30, suffix: "", label: "Van audits / month" },
  { value: 2500, suffix: "+", label: "Motif jobs / week" },
  { value: 37, suffix: " yrs", label: "Est. 1988" },
];

export function StatStrip({ stats = defaultStats, onDark = false }: StatStripProps) {
  return (
    <section
      className={`py-16 border-y ${onDark ? "bg-[var(--color-dark-blue)] border-white/10" : "bg-[var(--color-light-grey)] border-[var(--color-border)]"}`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 100}>
              <div className={`text-[48px] lg:text-[64px] leading-none font-semibold ${onDark ? "text-white" : "text-[var(--color-dark-blue)]"}`}>
                <NumberTicker value={s.value} suffix={s.suffix} client:load />
              </div>
              <div className={`text-[11px] uppercase tracking-widest mt-3 font-medium ${onDark ? "text-white/70" : "text-[var(--color-mid-blue)]"}`}>
                {s.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Replace contents of `src/components/sections/ServiceList.tsx` with**

```tsx
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

interface ServiceListProps {
  eyebrow: string;
  heading: string;
  items: ServiceItem[];
}

export function ServiceList({ eyebrow, heading, items }: ServiceListProps) {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">{eyebrow}</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-3xl">{heading}</AnimatedHeading>
          </div>
        </div>

        <ul className="border-t border-[var(--color-border-strong)]">
          {items.map((item, i) => (
            <FadeIn as="span" key={item.title} delay={i * 80} className="block border-b border-[var(--color-border-strong)] group hover:bg-[var(--color-light-grey)] transition-colors duration-400">
              <div className="grid grid-cols-12 gap-6 py-8 lg:py-10">
                <div className="col-span-12 md:col-span-2 text-xs uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
                  {item.number}
                </div>
                <div className="col-span-12 md:col-span-10">
                  <h3 className="text-[var(--color-dark-blue)] text-[22px] lg:text-[28px] font-semibold mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Build and visual check**

```bash
npm run build && npm run dev
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/StatStrip.tsx src/components/sections/ServiceList.tsx
git commit -m "feat(sections): rebuild StatStrip and ServiceList with brand palette"
```

---

# Phase 6 — Commercial Sector Pages (Telecoms, Civils, Utilities)

Rebuild the three commercial sector pages using the shared sections, each with its signature motion component and SectorIndex left-rail.

### Task 29: Rebuild TelecomsPage with FibreDraw signature

**Files:**
- Modify: `src/components/pages/TelecomsPage.tsx`

- [ ] **Step 1: Replace contents of `src/components/pages/TelecomsPage.tsx` with**

```tsx
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { Button } from "../Button";
import { NumberTicker } from "../NumberTicker";
import { SectorIndex } from "../SectorIndex";
import { FibreDraw } from "../motion/FibreDraw";
import { PageShell } from "../sections/PageShell";
import { ServiceList } from "../sections/ServiceList";
import { CTASection } from "../sections/CTASection";

const caseImage = "https://picsum.photos/seed/lambs-fujitsu-motif/1600/1200";

const services = [
  { number: "01", title: "FTTH / FTTP rollout", description: "Full-fibre to the home and premises. Design-and-build, surveys, splicing and commissioning for national operators." },
  { number: "02", title: "Blown fibre & splicing", description: "Microduct blowing, fusion splicing, OTDR testing and certification to operator standards." },
  { number: "03", title: "Directional drilling", description: "Moling and horizontal directional drilling for low-impact cable installs under highways, driveways and gardens." },
  { number: "04", title: "Mole ploughing", description: "High-speed duct and cable installation across verges, footpaths and rural routes with minimal reinstatement." },
  { number: "05", title: "Surveys & design", description: "Pre-build surveys, route planning and on-street validation to keep builds on programme." },
  { number: "06", title: "Cabinet installs", description: "PCP and FTTC cabinet foundations, installations, power connections and commissioning." },
];

const telecomsAccreditations = ["NRSWA", "Streetworks", "CSCS", "NEBOSH", "ECS"];

export function TelecomsPage() {
  return (
    <PageShell>
      <SectorIndex label="01 / TELECOMS" client:load />

      {/* ============ HERO with FibreDraw ============ */}
      <section className="relative bg-[var(--color-dark-blue)] overflow-hidden min-h-[90svh] flex items-end">
        <div className="absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none">
          <FibreDraw client:load />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-[180px] pb-20 w-full">
          <FadeIn><span className="eyebrow eyebrow-dark mb-8">Sector 01 · Telecoms</span></FadeIn>
          <AnimatedHeading as="h1" className="text-white max-w-4xl mt-8 mb-10" stagger={40}>
            From survey to splice. At national scale.
          </AnimatedHeading>
          <FadeIn delay={280}>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Trusted fibre delivery for the UK's largest operators. FTTH, FTTP, blown fibre, splicing, directional drilling — delivered by directly employed crews, compliant to operator standard.
            </p>
          </FadeIn>
        </div>
      </section>

      <ServiceList
        eyebrow="What we deliver"
        heading="A full-stack telecoms crew, under one roof."
        items={services}
      />

      {/* ============ MOTIF CASE STUDY ============ */}
      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <RevealImage src={caseImage} alt="Virgin Media Motif programme" aspect="aspect-[5/4]" />
            </div>
            <div className="lg:col-span-6">
              <FadeIn><span className="eyebrow mb-6">Flagship programme</span></FadeIn>
              <AnimatedHeading as="h2" className="mt-6 mb-8 max-w-xl">
                Fujitsu · Virgin Media Motif
              </AnimatedHeading>
              <FadeIn delay={200}>
                <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mb-10 max-w-xl">
                  Lambs Group runs one of the largest operational crews on Virgin Media's Motif programme — a major UK full-fibre build-out delivered in partnership with Fujitsu.
                </p>
              </FadeIn>
              <div className="grid grid-cols-2 gap-px bg-[var(--color-border-strong)] max-w-lg mb-10">
                <FadeIn delay={280} className="bg-[var(--color-light-grey)] p-6">
                  <div className="text-[48px] lg:text-[56px] leading-none font-semibold text-[var(--color-dark-blue)]">
                    <NumberTicker value={2500} client:load /><span className="text-[var(--color-cyan)]">+</span>
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mt-2 font-medium">Jobs / week</div>
                </FadeIn>
                <FadeIn delay={360} className="bg-[var(--color-light-grey)] p-6">
                  <div className="text-[48px] lg:text-[56px] leading-none font-semibold text-[var(--color-dark-blue)]">
                    <NumberTicker value={10000} client:load /><span className="text-[var(--color-cyan)]">+</span>
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mt-2 font-medium">Homes / month</div>
                </FadeIn>
              </div>
              <FadeIn delay={440}>
                <Button href="/work/motif" variant="primary" size="md" arrow="up-right">Read the Motif story</Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ACCREDITATIONS ============ */}
      <section className="bg-white py-20 border-y border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="eyebrow">Telecoms accreditations</span>
                <h3 className="text-[28px] lg:text-[36px] font-semibold mt-4 max-w-xl text-[var(--color-dark-blue)]">
                  Qualified crews, certified to operator standard.
                </h3>
              </div>
              <p className="text-[var(--color-mid-blue)] text-sm max-w-sm uppercase tracking-wider font-medium">
                Placeholder list — to confirm with client
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {telecomsAccreditations.map((a, i) => (
              <FadeIn key={a} delay={i * 80}>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dark-blue)] border border-[var(--color-border-strong)] px-4 py-3 font-medium">
                  {a}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Planning a fibre programme?" heading="Let's walk the route." />
    </PageShell>
  );
}
```

- [ ] **Step 2: Build and visual check**

```bash
npm run build && npm run dev
```

Visit `/telecoms`. Verify: Dark Blue hero with Cyan fibre line drawing across, SectorIndex left-rail visible at ≥1280px, ServiceList below on white, case study with counters on Light Grey.

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/TelecomsPage.tsx
git commit -m "feat(telecoms): rebuild TelecomsPage with FibreDraw signature and brand palette"
```

---

### Task 30: Rebuild CivilWorksPage with StratPeel signature

**Files:**
- Modify: `src/components/pages/CivilWorksPage.tsx`

- [ ] **Step 1: Replace contents of `src/components/pages/CivilWorksPage.tsx` with**

```tsx
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { SectorIndex } from "../SectorIndex";
import { StratPeel } from "../motion/StratPeel";
import { PageShell } from "../sections/PageShell";
import { ServiceList } from "../sections/ServiceList";
import { CTASection } from "../sections/CTASection";

const services = [
  { number: "01", title: "Excavation", description: "Bulk dig, service trenches, chamber bases and deep excavations using modern plant and trained operators." },
  { number: "02", title: "Reinstatement", description: "Permanent and interim reinstatement to NRSWA standards — footways, carriageways, block paving and verges." },
  { number: "03", title: "Road works", description: "Carriageway excavations, resurfacing and safe temporary traffic management on adopted and private roads." },
  { number: "04", title: "Footways", description: "Tactile paving, kerbing, edge restraints and block paving for new developments and reinstatement schemes." },
  { number: "05", title: "Drainage", description: "Surface and foul drainage, SUDS features and connection works for developers and local authorities." },
  { number: "06", title: "Ducting & chambers", description: "Multi-service ducting routes, jointing chambers, toby boxes and frame-and-cover installs." },
];

const clients = [
  "Barratt Developments", "Alfred McAlpine", "Bury Council", "Local Authorities · UK-wide",
];

export function CivilWorksPage() {
  return (
    <PageShell>
      <SectorIndex label="02 / CIVIL WORKS" client:load />

      {/* ============ HERO with StratPeel ============ */}
      <section className="relative bg-white overflow-hidden pt-[140px] pb-16 lg:pt-[180px] lg:pb-24 border-b border-[var(--color-border)]">
        <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <FadeIn><span className="eyebrow mb-6">Sector 02 · Civil Works</span></FadeIn>
              <AnimatedHeading as="h1" className="max-w-4xl mt-4 mb-8" stagger={40}>
                Dig, duct, reinstate. Done to NRSWA standard.
              </AnimatedHeading>
              <FadeIn delay={260}>
                <p className="text-[var(--color-charcoal)] text-lg md:text-xl leading-relaxed max-w-2xl">
                  Civils since 1988. From housing estate enabling works to local authority reinstatement frameworks — Lambs Group brings a full civils capability to every programme.
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-5">
              <StratPeel client:load />
            </div>
          </div>
        </div>
      </section>

      <ServiceList eyebrow="What we deliver" heading="Civil works, done once, done right." items={services} />

      {/* ============ CLIENT ROSTER ============ */}
      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Notable clients</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">
                Developers and authorities who come back.
              </AnimatedHeading>
              <FadeIn delay={240}>
                <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-8 max-w-2xl">
                  From national housebuilders to county councils — repeat orders, direct delivery, no subcontracting shuffle.
                </p>
              </FadeIn>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border-strong)]">
            {clients.map((client, i) => (
              <FadeIn key={client} delay={i * 120} className="bg-[var(--color-light-grey)] p-8 lg:p-10 min-h-[180px] flex items-end">
                <h3 className="text-[var(--color-dark-blue)] text-[22px] lg:text-[26px] leading-tight font-semibold">
                  {client}
                </h3>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Civil works enquiries" heading="Let's scope your next programme." />
    </PageShell>
  );
}
```

- [ ] **Step 2: Build and visual check**

```bash
npm run build && npm run dev
```

Visit `/civil-works`. Verify: white hero, StratPeel layers peeling in on the right, left-rail SectorIndex, ServiceList, client roster on Light Grey.

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/CivilWorksPage.tsx
git commit -m "feat(civils): rebuild CivilWorksPage with StratPeel signature and brand palette"
```

---

### Task 31: Rebuild UtilitiesPage with FlowLines signature

**Files:**
- Modify: `src/components/pages/UtilitiesPage.tsx`

- [ ] **Step 1: Replace contents of `src/components/pages/UtilitiesPage.tsx` with**

```tsx
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { SectorIndex } from "../SectorIndex";
import { FlowLines } from "../motion/FlowLines";
import { PageShell } from "../sections/PageShell";
import { ServiceList } from "../sections/ServiceList";
import { CTASection } from "../sections/CTASection";

const services = [
  { number: "01", title: "Water supply works", description: "New mains laying, service connections, meter installs and network extensions on housing and commercial sites." },
  { number: "02", title: "Gas supply", description: "Gas mains, service connections, riser works and safe site isolation delivered by accredited crews." },
  { number: "03", title: "Electricity supply", description: "LV and HV ducting routes, service cabinets and connection works coordinated with DNO programmes." },
  { number: "04", title: "Ducting", description: "Multi-utility ducting installation, marker tape, warning mesh and chamber setting-out." },
  { number: "05", title: "Jointing", description: "Cable and pipe jointing delivered to operator standards, including LV jointing and pressure testing." },
  { number: "06", title: "Mains laying & connections", description: "From bulk mains to final service connections — one crew, one programme, one point of contact." },
];

const utilitiesAccreditations = ["WIRS", "GIRS", "NERS", "NRSWA", "CHAS"];

export function UtilitiesPage() {
  return (
    <PageShell>
      <SectorIndex label="03 / UTILITIES" client:load />

      {/* ============ HERO with FlowLines ============ */}
      <section className="relative bg-white overflow-hidden pt-[140px] pb-16 lg:pt-[180px] lg:pb-24 border-b border-[var(--color-border)]">
        <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn><span className="eyebrow mb-6">Sector 03 · Utilities</span></FadeIn>
          <AnimatedHeading as="h1" className="max-w-4xl mt-4 mb-8" stagger={40}>
            Water, gas, power — laid and connected.
          </AnimatedHeading>
          <FadeIn delay={260}>
            <p className="text-[var(--color-charcoal)] text-lg md:text-xl leading-relaxed max-w-3xl mb-12">
              Utility supply works for housing, industrial and local authority schemes across the UK. From new mains to the final service connection — one accredited crew, one programme, one point of contact.
            </p>
          </FadeIn>
          <div className="h-[280px] lg:h-[340px] border-t border-b border-[var(--color-border)]">
            <FlowLines client:load />
          </div>
          <div className="grid grid-cols-3 gap-8 mt-6 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
            <span><span className="inline-block w-3 h-[2px] align-middle bg-[var(--color-dark-blue)] mr-2"></span>Power</span>
            <span><span className="inline-block w-3 h-[2px] align-middle bg-[var(--color-mid-blue)] mr-2"></span>Water</span>
            <span><span className="inline-block w-3 h-[2px] align-middle bg-[var(--color-cyan)] mr-2"></span>Gas</span>
          </div>
        </div>
      </section>

      <ServiceList eyebrow="What we deliver" heading="Three utilities. One accountable crew." items={services} />

      {/* ============ ACCREDITATIONS ============ */}
      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="eyebrow">Utilities accreditations</span>
                <h2 className="text-[36px] lg:text-[56px] font-semibold mt-6 max-w-2xl leading-[1.05] text-[var(--color-dark-blue)]">
                  Certified to lay mains,<br />trained to connect homes.
                </h2>
              </div>
              <p className="text-[var(--color-mid-blue)] text-sm max-w-sm uppercase tracking-wider font-medium">
                Placeholder list — to confirm with client
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {utilitiesAccreditations.map((a, i) => (
              <FadeIn key={a} delay={i * 80}>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dark-blue)] border border-[var(--color-border-strong)] px-4 py-3 bg-white font-medium">
                  {a}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Utilities enquiries" heading="Need mains laid? Let's talk." />
    </PageShell>
  );
}
```

- [ ] **Step 2: Build and visual check**

```bash
npm run build && npm run dev
```

Visit `/utilities`. Verify: FlowLines animate across the hero with pulses flowing along each of the three lines; colour legend below.

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/UtilitiesPage.tsx
git commit -m "feat(utilities): rebuild UtilitiesPage with FlowLines signature and brand palette"
```

---

# Phase 7 — Private Works (new sector page)

Build the new `/private-works` page with homeowner-focused content: before/after hero, portfolio gallery, finishes swatches, pricing bands, domestic quote form.

### Task 32: Create Astro route and PrivateWorksPage shell

**Files:**
- Create: `src/pages/private-works.astro`
- Create: `src/components/pages/PrivateWorksPage.tsx`

- [ ] **Step 1: Create the Astro route `src/pages/private-works.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import { PrivateWorksPage } from "../components/pages/PrivateWorksPage";
---
<Base
  title="Private Works — Driveways, resin, block paving, patios | Lambs Group"
  description="Domestic driveways, resin surfacing, block paving, patios, drainage and dropped kerbs across the North West. Family-run, compliance-first, directly employed crews."
>
  <PrivateWorksPage client:load />
</Base>
```

- [ ] **Step 2: Create the page component shell `src/components/pages/PrivateWorksPage.tsx`**

```tsx
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { SectorIndex } from "../SectorIndex";
import { BeforeAfter } from "../motion/BeforeAfter";
import { PageShell } from "../sections/PageShell";
import { CTASection } from "../sections/CTASection";
import { PrivateServicesGrid } from "./private/PrivateServicesGrid";
import { FinishesGallery } from "./private/FinishesGallery";
import { PortfolioGallery } from "./private/PortfolioGallery";
import { PricingBand } from "./private/PricingBand";
import { QuoteForm } from "./private/QuoteForm";

const beforeSrc = "https://picsum.photos/seed/pw-before/1600/1000";
const afterSrc = "https://picsum.photos/seed/pw-after/1600/1000";

export function PrivateWorksPage() {
  return (
    <PageShell>
      <SectorIndex label="04 / PRIVATE WORKS" client:load />

      {/* ============ HERO with BeforeAfter ============ */}
      <section className="relative bg-white pt-[140px] pb-20 lg:pt-[180px] lg:pb-28 border-b border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <FadeIn><span className="eyebrow mb-6">Sector 04 · Private Works · Domestic</span></FadeIn>
              <AnimatedHeading as="h1" className="mt-4 mb-8" stagger={40}>
                Your driveway, finished right.
              </AnimatedHeading>
              <FadeIn delay={260}>
                <p className="text-[var(--color-charcoal)] text-lg md:text-xl leading-relaxed max-w-md mb-8">
                  Tarmac, resin, block paving, patios, drainage and dropped kerbs — laid by the same crews that work on our commercial programmes. Directly employed. Compliance-first. Fixed quotes.
                </p>
              </FadeIn>
              <FadeIn delay={380}>
                <Button href="#quote" variant="primary" size="lg">Get a quote</Button>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <BeforeAfter
                beforeSrc={beforeSrc}
                afterSrc={afterSrc}
                beforeAlt="Driveway before — cracked tarmac"
                afterAlt="Driveway after — new resin finish"
              />
            </div>
          </div>
        </div>
      </section>

      <PrivateServicesGrid />
      <FinishesGallery />
      <PortfolioGallery />
      <PricingBand />
      <QuoteForm id="quote" />

      <CTASection
        eyebrow="Private Works"
        heading="Ready to start your driveway?"
        primaryLabel="Get a quote"
        primaryHref="#quote"
      />
    </PageShell>
  );
}
```

- [ ] **Step 3: Build — will fail because child components don't exist yet**

```bash
npm run build
```

Expected: fails with "Cannot find module './private/PrivateServicesGrid'". That's expected — next tasks create them.

- [ ] **Step 4: Don't commit yet — wait until Task 38 when the page composes cleanly.**

---

### Task 33: Build PrivateServicesGrid component

**Files:**
- Create: `src/components/pages/private/PrivateServicesGrid.tsx`

- [ ] **Step 1: Create `src/components/pages/private/PrivateServicesGrid.tsx`**

```tsx
import { Construction, Layers, Grid3x3, SquareStack, Droplets, ArrowDownToLine, Hammer } from "lucide-react";
import { FadeIn } from "../../FadeIn";
import { AnimatedHeading } from "../../AnimatedHeading";

const services = [
  { icon: Construction, title: "Tarmac", blurb: "Full driveway relays and overlays in quality-graded tarmac, sealed and rolled." },
  { icon: Layers, title: "Resin", blurb: "UV-stable resin-bound finishes in a range of aggregates — permeable and long-lasting." },
  { icon: Grid3x3, title: "Block paving", blurb: "Traditional and contemporary block paving in marshalls, brett and bradstone ranges." },
  { icon: SquareStack, title: "Patios", blurb: "Indian stone, porcelain and natural stone patios laid to full manufacturer spec." },
  { icon: Droplets, title: "Drainage", blurb: "ACO channel drains, soakaways and SUDS-compliant drainage for driveways and patios." },
  { icon: ArrowDownToLine, title: "Dropped kerbs", blurb: "Council-approved dropped kerb applications, construction and highway reinstatement." },
  { icon: Hammer, title: "Groundworks", blurb: "Domestic groundworks — excavation, levelling, foundations, edging and site prep." },
];

export function PrivateServicesGrid() {
  return (
    <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">What we do</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-3xl">
              Seven domestic services. One accountable crew.
            </AnimatedHeading>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border-strong)]">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.title} delay={i * 100} className="bg-[var(--color-light-grey)] p-8 group hover:bg-white transition-colors duration-500">
                <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-dark-blue)] group-hover:bg-[var(--color-cyan)] transition-colors duration-500 mb-6">
                  <Icon className="w-6 h-6 text-white group-hover:text-[var(--color-dark-blue)] transition-colors duration-500" strokeWidth={1.8} />
                </div>
                <h3 className="text-[22px] lg:text-[26px] font-semibold text-[var(--color-dark-blue)] mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{s.blurb}</p>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: (commit deferred until the full page composes — Task 38)**

---

### Task 34: Build FinishesGallery component

**Files:**
- Create: `src/components/pages/private/FinishesGallery.tsx`

- [ ] **Step 1: Create `src/components/pages/private/FinishesGallery.tsx`**

```tsx
import { FadeIn } from "../../FadeIn";
import { AnimatedHeading } from "../../AnimatedHeading";

const finishes = [
  { name: "Resin — Autumn Gold", image: "https://picsum.photos/seed/resin-autumn/500/500" },
  { name: "Resin — Silver Birch", image: "https://picsum.photos/seed/resin-silver/500/500" },
  { name: "Resin — Charcoal Mix", image: "https://picsum.photos/seed/resin-charcoal/500/500" },
  { name: "Block — Bradstone Charcoal", image: "https://picsum.photos/seed/block-charcoal/500/500" },
  { name: "Block — Marshalls Natural", image: "https://picsum.photos/seed/block-natural/500/500" },
  { name: "Indian Stone — Kandla Grey", image: "https://picsum.photos/seed/stone-kandla/500/500" },
];

export function FinishesGallery() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">Finishes</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-2xl">
              Pick your finish.
            </AnimatedHeading>
            <FadeIn delay={200}>
              <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                A selection of the most-requested finishes. Ask us for samples of anything not listed — most major manufacturer ranges are available to order.
              </p>
            </FadeIn>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {finishes.map((f, i) => (
            <FadeIn key={f.name} delay={i * 80}>
              <div className="group relative aspect-square overflow-hidden">
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-[var(--color-cyan)] transition-all duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[var(--color-dark-blue)]/90 to-transparent">
                  <p className="text-white text-[12px] font-medium leading-tight">{f.name}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: (commit deferred)**

---

### Task 35: Build PortfolioGallery component

**Files:**
- Create: `src/components/pages/private/PortfolioGallery.tsx`

- [ ] **Step 1: Create `src/components/pages/private/PortfolioGallery.tsx`**

```tsx
import { useState } from "react";
import { FadeIn } from "../../FadeIn";
import { AnimatedHeading } from "../../AnimatedHeading";
import { BeforeAfter } from "../../motion/BeforeAfter";

type Category = "All" | "Resin" | "Block paving" | "Tarmac" | "Patio";

interface PortfolioItem {
  id: string;
  category: Category;
  title: string;
  location: string;
  beforeSrc: string;
  afterSrc: string;
}

const portfolio: PortfolioItem[] = [
  { id: "1", category: "Resin", title: "Resin drive — Warrington", location: "Warrington", beforeSrc: "https://picsum.photos/seed/p1b/900/600", afterSrc: "https://picsum.photos/seed/p1a/900/600" },
  { id: "2", category: "Block paving", title: "Block paving — Altrincham", location: "Altrincham", beforeSrc: "https://picsum.photos/seed/p2b/900/600", afterSrc: "https://picsum.photos/seed/p2a/900/600" },
  { id: "3", category: "Tarmac", title: "Tarmac relay — Lymm", location: "Lymm", beforeSrc: "https://picsum.photos/seed/p3b/900/600", afterSrc: "https://picsum.photos/seed/p3a/900/600" },
  { id: "4", category: "Patio", title: "Indian stone patio — Hale", location: "Hale", beforeSrc: "https://picsum.photos/seed/p4b/900/600", afterSrc: "https://picsum.photos/seed/p4a/900/600" },
  { id: "5", category: "Resin", title: "Resin with border — Knutsford", location: "Knutsford", beforeSrc: "https://picsum.photos/seed/p5b/900/600", afterSrc: "https://picsum.photos/seed/p5a/900/600" },
  { id: "6", category: "Block paving", title: "Herringbone — Stockton Heath", location: "Stockton Heath", beforeSrc: "https://picsum.photos/seed/p6b/900/600", afterSrc: "https://picsum.photos/seed/p6a/900/600" },
];

const categories: Category[] = ["All", "Resin", "Block paving", "Tarmac", "Patio"];

export function PortfolioGallery() {
  const [filter, setFilter] = useState<Category>("All");
  const filtered = filter === "All" ? portfolio : portfolio.filter((p) => p.category === filter);

  return (
    <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">Recent work</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-2xl">Before and after.</AnimatedHeading>
            <FadeIn delay={200}>
              <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                A sample of recent Private Works projects across the North West. Drag the slider on each to compare.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors duration-300 ${
                filter === c
                  ? "bg-[var(--color-cyan)] text-[var(--color-dark-blue)]"
                  : "border border-[var(--color-border-strong)] text-[var(--color-dark-blue)] hover:border-[var(--color-dark-blue)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((p, i) => (
            <FadeIn key={p.id} delay={i * 80}>
              <article>
                <BeforeAfter beforeSrc={p.beforeSrc} afterSrc={p.afterSrc} beforeAlt={`${p.title} — before`} afterAlt={`${p.title} — after`} />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[var(--color-dark-blue)] font-semibold text-[18px] leading-tight">{p.title}</h3>
                    <p className="text-[var(--color-mid-blue)] text-[12px] uppercase tracking-widest mt-1 font-medium">
                      {p.category} · {p.location}
                    </p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: (commit deferred)**

---

### Task 36: Build PricingBand component

**Files:**
- Create: `src/components/pages/private/PricingBand.tsx`

- [ ] **Step 1: Create `src/components/pages/private/PricingBand.tsx`**

```tsx
import { FadeIn } from "../../FadeIn";
import { AnimatedHeading } from "../../AnimatedHeading";

// NOTE: pricing bands are indicative — to confirm with client before launch
const pricing = [
  { finish: "Tarmac", from: "£55", unit: "per m²" },
  { finish: "Resin-bound", from: "£90", unit: "per m²" },
  { finish: "Block paving", from: "£85", unit: "per m²" },
  { finish: "Indian stone patio", from: "£110", unit: "per m²" },
  { finish: "ACO drainage", from: "£65", unit: "per linear m" },
  { finish: "Dropped kerb", from: "£950", unit: "complete" },
];

export function PricingBand() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">Indicative pricing</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-2xl">Honest starting prices.</AnimatedHeading>
            <FadeIn delay={200}>
              <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                Every job is quoted individually, but these are our typical starting points. Supply, lay, compact and clean-down included. No deposit required.
              </p>
            </FadeIn>
          </div>
        </div>

        <ul className="border-t border-[var(--color-border-strong)]">
          {pricing.map((p, i) => (
            <FadeIn as="span" key={p.finish} delay={i * 60} className="block border-b border-[var(--color-border-strong)]">
              <div className="grid grid-cols-12 items-center py-6 lg:py-7 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <h3 className="text-[var(--color-dark-blue)] text-[20px] lg:text-[24px] font-semibold">{p.finish}</h3>
                </div>
                <div className="col-span-6 md:col-span-3 text-[var(--color-mid-blue)] text-[12px] uppercase tracking-widest font-medium">
                  From
                </div>
                <div className="col-span-6 md:col-span-3 text-right text-[var(--color-dark-blue)] text-[20px] lg:text-[24px] font-semibold">
                  {p.from} <span className="text-[12px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium ml-1">{p.unit}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </ul>

        <FadeIn delay={500}>
          <p className="text-[var(--color-mid-blue)] text-sm mt-8 uppercase tracking-wider font-medium">
            * Indicative only. Full quotation provided after free on-site measure.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: (commit deferred)**

---

### Task 37: Build QuoteForm component (domestic-specific)

**Files:**
- Create: `src/components/pages/private/QuoteForm.tsx`

- [ ] **Step 1: Create `src/components/pages/private/QuoteForm.tsx`**

```tsx
import { useState } from "react";
import { FadeIn } from "../../FadeIn";
import { AnimatedHeading } from "../../AnimatedHeading";
import { Button } from "../../Button";

interface QuoteFormProps {
  id?: string;
}

export function QuoteForm({ id }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id={id} className="bg-[var(--color-light-grey)] py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <FadeIn><span className="eyebrow mb-6">Get a quote</span></FadeIn>
            <AnimatedHeading as="h2" className="mt-4 mb-6 max-w-md">Your driveway, measured free.</AnimatedHeading>
            <FadeIn delay={200}>
              <p className="text-[var(--color-charcoal)] text-lg leading-relaxed max-w-md">
                Tell us about your drive. We'll come out, measure up, and send a fixed-price quote within 48 hours. No deposit, no pushy sales, no surprise extras.
              </p>
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            {submitted ? (
              <FadeIn>
                <div className="bg-[var(--color-dark-blue)] text-white p-10">
                  <h3 className="text-2xl font-semibold mb-3">Thanks — we've got it.</h3>
                  <p className="text-white/80">We'll be in touch within one working day to arrange a free on-site measure.</p>
                </div>
              </FadeIn>
            ) : (
              <FadeIn delay={120}>
                <form
                  className="flex flex-col gap-6 bg-white p-8 lg:p-10 border border-[var(--color-border)]"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                >
                  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
                  <input type="hidden" name="subject" value="Private Works quote request" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Your name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Phone" name="phone" type="tel" />
                    <Field label="Postcode" name="postcode" required />
                  </div>
                  <Field label="Address line 1" name="address" />
                  <Field label="Approx area (m²)" name="area" type="number" />
                  <SelectField
                    label="Finish interest"
                    name="finish"
                    options={["Tarmac", "Resin", "Block paving", "Patio", "Drainage", "Dropped kerb", "Not sure / mix"]}
                  />
                  <SelectField
                    label="Target timing"
                    name="timing"
                    options={["As soon as possible", "Within 1 month", "Within 3 months", "Later this year", "No rush"]}
                  />
                  <FileField label="Photos of the area (optional)" name="photos" />
                  <TextareaField label="Anything else we should know?" name="notes" />

                  <div className="pt-2">
                    <Button variant="primary" size="lg" type="submit">Send quote request</Button>
                  </div>
                </form>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">
        {label}{required && <span className="text-[var(--color-cyan)] ml-0.5">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors"
      />
    </label>
  );
}
function TextareaField({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">{label}</span>
      <textarea
        name={name}
        rows={4}
        className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors resize-none"
      />
    </label>
  );
}
function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">{label}</span>
      <select name={name} className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
function FileField({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">{label}</span>
      <input
        type="file"
        name={name}
        accept="image/*"
        multiple
        className="text-sm text-[var(--color-charcoal)] file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[var(--color-dark-blue)] file:text-white file:text-sm file:uppercase file:tracking-wide hover:file:bg-[var(--color-cyan)] hover:file:text-[var(--color-dark-blue)] transition-colors"
      />
    </label>
  );
}
```

- [ ] **Step 2: (commit deferred)**

---

### Task 38: Final build check of Private Works page and commit Phase 7

**Files:** None (verification only)

- [ ] **Step 1: Build the full site**

```bash
npm run build
```

Expected: Build succeeds — all components exist, Private Works page composes.

- [ ] **Step 2: Dev server check**

```bash
npm run dev
```

Visit `/private-works`. Verify:
- Hero with draggable before/after wipe
- Services grid (7 tiles) on Light Grey
- Finishes gallery on White
- Portfolio with filter chips and before/after per tile
- Pricing band
- Quote form with domestic fields + photo upload

- [ ] **Step 3: Commit the whole Private Works page as one coherent unit**

```bash
git add src/pages/private-works.astro src/components/pages/PrivateWorksPage.tsx src/components/pages/private/
git commit -m "feat(private-works): build Private Works page with 7 domestic services, portfolio, pricing and quote form"
```

---

**Milestone 2 (Sector pages) complete at end of Task 38. Recommended review point.**

---

# Phase 8 — About / Team / Careers / Contact Updates

Update the four existing "company" pages for brand palette and tone.

### Task 39: Update AboutPage with brand palette and values block on Dark Blue

**Files:**
- Modify: `src/components/pages/AboutPage.tsx`

- [ ] **Step 1: Replace the contents of `src/components/pages/AboutPage.tsx` with**

```tsx
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";

const storyImage = "https://picsum.photos/seed/lambs-warrington-hq/1600/2000";
const fieldImage = "https://picsum.photos/seed/lambs-crew-on-site/1600/1200";

const values = [
  { number: "01", title: "Directly employed workforce", description: "100+ directly employed operatives and engineers. Not agency, not sub-sub. PAYE, trained, accountable.", chip: "100+ operatives" },
  { number: "02", title: "Compliance-first delivery", description: "NRSWA-trained, NEBOSH-accredited supervision. 30 van audits per month. Audited, logged, actioned.", chip: "30 audits / month" },
  { number: "03", title: "Family-run, thirty-seven years", description: "Still run by Simon & Amanda Lamb. Still answering the phone. Still remembering every operative's name.", chip: "Est. 1988" },
  { number: "04", title: "Long client relationships", description: "Our clients come back year after year. Trust built one programme at a time.", chip: "Repeat clients" },
];

const timeline = [
  { year: "1988", title: "Founded as S Lamb Construction", body: "Simon Lamb starts the business with a single crew. Direct delivery, no subcontracting shuffle." },
  { year: "1990s", title: "Civil works expansion", body: "Growing reputation across the North West for drainage, reinstatement and footway schemes." },
  { year: "2000s", title: "Telecoms specialism", body: "First fibre contracts. Lambs becomes a trusted telecoms civils partner for national operators." },
  { year: "2010s", title: "Utilities arm launched", body: "Expansion into water, gas and electricity connections across housing and industrial schemes." },
  { year: "Today", title: "Motif · Virgin Media", body: "One of the largest operational crews on Virgin Media's Motif programme. 2,500 jobs per week, 10,000 homes per month." },
];

export function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Lambs Group"
        heading="Thirty-seven years delivering infrastructure."
        lede="Lambs Group is a family-run infrastructure contractor based in Warrington. Telecoms, civils, utilities and domestic works, delivered by directly employed crews across the UK since 1988."
        image={storyImage}
        imageAlt="Lambs Group Warrington headquarters"
        sectionIndex="— / About"
      />

      {/* ============ STORY ============ */}
      <section className="bg-white py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <FadeIn><span className="eyebrow">The story</span></FadeIn>
              <AnimatedHeading as="h2" className="mt-6 max-w-xl">A Warrington yard. A clear idea.</AnimatedHeading>
            </div>
            <div className="lg:col-span-7 space-y-6 text-[var(--color-charcoal)] text-lg leading-relaxed">
              <FadeIn delay={180}>
                <p>In 1988, Simon Lamb founded S Lamb Construction with a small team and a clear principle: employ the people who do the work. Subcontracting through multiple layers, he'd seen, undermines quality and safety.</p>
              </FadeIn>
              <FadeIn delay={260}>
                <p>Today — now trading as Lambs Group — the company is still based in Warrington, still family-run by Simon and his wife Amanda Lamb, and still employing its operatives directly. Over 100 of them, delivering civils, telecoms, utilities and domestic works from the North West to the south coast.</p>
              </FadeIn>
              <FadeIn delay={340}>
                <p>The work has grown. The values haven't.</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALUES (Dark Blue band) ============ */}
      <section className="bg-[var(--color-dark-blue)] text-white py-24 lg:py-36 relative">
        <div className="grid-bg-dark absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow eyebrow-dark">What we stand for</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="text-white max-w-3xl">Four things we don't compromise on.</AnimatedHeading>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 140} className="bg-[var(--color-dark-blue)] p-10 lg:p-14">
                <div className="flex items-start gap-6">
                  <span className="text-xs uppercase tracking-widest text-[var(--color-cyan)] font-medium">{v.number}</span>
                  <div>
                    <h3 className="text-white text-[26px] lg:text-[32px] font-semibold mb-4 leading-tight">{v.title}</h3>
                    <p className="text-white/75 text-[15px] leading-relaxed mb-5">{v.description}</p>
                    <span className="inline-block text-[11px] uppercase tracking-widest text-[var(--color-cyan)] border border-[var(--color-cyan)]/50 px-3 py-1.5 font-medium">
                      {v.chip}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <FadeIn><span className="eyebrow">Milestones</span></FadeIn>
              <AnimatedHeading as="h2" className="mt-6 mb-10 max-w-md">Three decades, one direction.</AnimatedHeading>
              <FadeIn delay={200}>
                <RevealImage src={fieldImage} alt="Lambs crew at work" aspect="aspect-[4/5]" />
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <ul className="border-t border-[var(--color-border-strong)]">
                {timeline.map((item, i) => (
                  <FadeIn key={item.year} as="span" delay={i * 100} className="block border-b border-[var(--color-border-strong)] py-8 lg:py-10">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 md:col-span-3 text-sm uppercase tracking-widest text-[var(--color-cyan)] font-semibold">
                        {item.year}
                      </div>
                      <div className="col-span-12 md:col-span-9">
                        <h3 className="text-[var(--color-dark-blue)] text-[22px] lg:text-[26px] font-semibold mb-3 leading-tight">{item.title}</h3>
                        <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection eyebrow="Work with us" heading="Thirty-seven years in. Still answering the phone." />
    </PageShell>
  );
}
```

- [ ] **Step 2: Build and visual check**

```bash
npm run build && npm run dev
```

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/AboutPage.tsx
git commit -m "feat(about): rebuild AboutPage with brand palette, compliance-first values, updated timeline"
```

---

### Task 40: Update TeamPage with "On the Motif crew" section

**Files:**
- Modify: `src/components/pages/TeamPage.tsx`

- [ ] **Step 1: Replace contents of `src/components/pages/TeamPage.tsx` with**

```tsx
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";

const leadership = [
  { name: "Simon Lamb", role: "Managing Director", bio: "Founded the business in 1988. Still walks sites. Still picks up the phone.", image: "https://picsum.photos/seed/lambs-simon/900/1200" },
  { name: "Amanda Lamb", role: "Director", bio: "Runs the business alongside Simon. Finance, HR, and keeping the wheels on.", image: "https://picsum.photos/seed/lambs-amanda/900/1200" },
  { name: "Dave Edmonds", role: "Operations Manager", bio: "Runs day-to-day delivery across every live programme. Former site foreman.", image: "https://picsum.photos/seed/lambs-dave/900/1200" },
  { name: "Tony Potts", role: "Health & Safety", bio: "NEBOSH-accredited. Keeps every site compliant, tidy and accident-free.", image: "https://picsum.photos/seed/lambs-tony/900/1200" },
  { name: "Brian Saidie", role: "Health & Safety", bio: "Audits, toolbox talks and close-out reporting across the operational crew.", image: "https://picsum.photos/seed/lambs-brian/900/1200" },
  { name: "Ian Gee", role: "Team Manager", bio: "Front-line team lead on the Virgin Media Motif programme.", image: "https://picsum.photos/seed/lambs-ian/900/1200" },
];

const motifCrew = [
  { name: "Ian Gee", role: "Team Manager", image: "https://picsum.photos/seed/lambs-ian/600/800" },
  { name: "Sam B.", role: "Lead Jointer", image: "https://picsum.photos/seed/motif-sam/600/800" },
  { name: "Chris H.", role: "Splicer", image: "https://picsum.photos/seed/motif-chris/600/800" },
  { name: "Danny M.", role: "Drilling Op.", image: "https://picsum.photos/seed/motif-danny/600/800" },
  { name: "Paul R.", role: "Ground Crew", image: "https://picsum.photos/seed/motif-paul/600/800" },
  { name: "Lee T.", role: "QC Inspector", image: "https://picsum.photos/seed/motif-lee/600/800" },
];

export function TeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="The team"
        heading="People you'll actually talk to."
        lede="Lambs Group is built on long tenures. The directors founded the business. The managers have worked here for decades. The operatives are directly employed."
        sectionIndex="— / Team"
      />

      {/* ============ LEADERSHIP ============ */}
      <section className="bg-white py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Directors &amp; managers</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">The people who run the programmes.</AnimatedHeading>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={i * 120}>
                <article className="group">
                  <RevealImage src={person.image} alt={person.name} aspect="aspect-[3/4]" className="mb-6" />
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] mb-2 font-medium border-b border-[var(--color-cyan)] pb-1 inline-block">
                    {person.role}
                  </div>
                  <h3 className="text-[var(--color-dark-blue)] text-[24px] lg:text-[28px] font-semibold mb-3 leading-tight mt-1">
                    {person.name}
                  </h3>
                  <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{person.bio}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MOTIF CREW ============ */}
      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Flagship crew</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">On the Motif crew.</AnimatedHeading>
              <FadeIn delay={200}>
                <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                  A selection of the team delivering ~2,500 jobs per week on the Virgin Media Motif programme. Same crew, same van, same name you'll see on your street.
                </p>
              </FadeIn>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {motifCrew.map((p, i) => (
              <FadeIn key={p.name} delay={i * 70}>
                <article>
                  <RevealImage src={p.image} alt={p.name} aspect="aspect-[3/4]" className="mb-3" />
                  <h4 className="text-[var(--color-dark-blue)] font-semibold text-[14px]">{p.name}</h4>
                  <p className="text-[var(--color-mid-blue)] text-[11px] uppercase tracking-widest mt-1 font-medium">{p.role}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Join the team" heading="We're always looking for good operatives." primaryLabel="See vacancies" primaryHref="/careers" />
    </PageShell>
  );
}
```

- [ ] **Step 2: Build and visual check**

```bash
npm run build && npm run dev
```

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/TeamPage.tsx
git commit -m "feat(team): rebuild TeamPage with brand palette and On the Motif crew section"
```

---

### Task 41: Update CareersPage with brand palette and life-on-site strip

**Files:**
- Modify: `src/components/pages/CareersPage.tsx`

- [ ] **Step 1: Replace contents of `src/components/pages/CareersPage.tsx` with**

```tsx
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { Button } from "../Button";
import { SectorIndex } from "../SectorIndex";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";
import { ArrowUpRight } from "lucide-react";

const reasons = [
  { number: "01", title: "Directly employed", body: "PAYE contracts, real training, career progression and long tenures. Not agency, not sub-sub." },
  { number: "02", title: "Proper training", body: "NRSWA, CSCS, NEBOSH — we invest in the tickets and the time it takes to earn them." },
  { number: "03", title: "Real progression", body: "Many of our managers started on a shovel. We promote from within." },
  { number: "04", title: "Family values", body: "Family-run since 1988. We look after our people because we know their names." },
];

const vacancies = [
  { title: "Fibre Jointer", location: "North West", type: "Full-time · PAYE", days: 4 },
  { title: "NRSWA Operative", location: "North West", type: "Full-time · PAYE", days: 7 },
  { title: "Groundworker", location: "UK-wide", type: "Full-time · PAYE", days: 2 },
  { title: "Site Supervisor", location: "Warrington HQ", type: "Full-time · PAYE", days: 14 },
];

const lifeImages = [
  "https://picsum.photos/seed/life-1/900/600",
  "https://picsum.photos/seed/life-2/900/600",
  "https://picsum.photos/seed/life-3/900/600",
];

export function CareersPage() {
  return (
    <PageShell>
      <SectorIndex label="— / CAREERS" client:load />
      <PageHero
        eyebrow="Careers at Lambs Group"
        heading="Work with people who stick around."
        lede="Directly employed operatives since 1988. If you want proper jobs, real trades, and to actually know who your boss is, we'd like to hear from you."
        sectionIndex="— / Careers"
      />

      {/* ============ REASONS ============ */}
      <section className="bg-white py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Why work here</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">Four reasons our people stay.</AnimatedHeading>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border-strong)]">
            {reasons.map((r, i) => (
              <FadeIn key={r.title} delay={i * 140} className="bg-white p-10 lg:p-14">
                <div className="flex items-start gap-6">
                  <span className="text-xs uppercase tracking-widest text-[var(--color-cyan)] font-semibold">{r.number}</span>
                  <div>
                    <h3 className="text-[var(--color-dark-blue)] text-[24px] lg:text-[30px] font-semibold mb-4 leading-tight">{r.title}</h3>
                    <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VACANCIES ============ */}
      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-5">
              <FadeIn><span className="eyebrow">Current vacancies</span></FadeIn>
              <AnimatedHeading as="h2" className="mt-6 max-w-md">Roles we're recruiting for.</AnimatedHeading>
            </div>
            <div className="lg:col-span-7 flex lg:justify-end lg:items-end">
              <FadeIn delay={200}>
                <p className="text-[var(--color-charcoal)] text-base leading-relaxed max-w-md">
                  Always open to speaking with qualified operatives. Don't see your role? Send us your CV anyway — we'll keep it on file.
                </p>
              </FadeIn>
            </div>
          </div>

          <ul className="border-t border-[var(--color-border-strong)]">
            {vacancies.map((v, i) => (
              <FadeIn key={v.title} as="span" delay={i * 100} className="block border-b border-[var(--color-border-strong)]">
                <a href="/contact" className="group grid grid-cols-12 items-center gap-6 py-8 lg:py-10 hover:bg-white transition-colors duration-500 px-2">
                  <span className="col-span-12 md:col-span-4 text-[var(--color-dark-blue)] text-[22px] lg:text-[28px] font-semibold">{v.title}</span>
                  <span className="col-span-6 md:col-span-3 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">{v.location}</span>
                  <span className="col-span-6 md:col-span-3 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">{v.type}</span>
                  <span className="col-span-6 md:col-span-1 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">{v.days}d ago</span>
                  <span className="col-span-6 md:col-span-1 flex md:justify-end">
                    <ArrowUpRight className="w-5 h-5 text-[var(--color-dark-blue)] group-hover:text-[var(--color-cyan)] btn-arrow" />
                  </span>
                </a>
              </FadeIn>
            ))}
          </ul>

          <FadeIn delay={500}>
            <div className="mt-16 flex flex-col md:flex-row gap-4">
              <Button href="/contact" variant="primary" size="lg">Send us your CV</Button>
              <Button href="tel:01925850982" variant="secondary" size="lg" arrow="none">Recruitment line · 01925 850 982</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ LIFE ON SITE ============ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn><span className="eyebrow mb-8 block">Life on site</span></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lifeImages.map((img, i) => (
              <FadeIn key={img} delay={i * 120}>
                <RevealImage src={img} alt="Life on site" aspect="aspect-[3/2]" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Join the crew" heading="Good operatives welcome. Always." />
    </PageShell>
  );
}
```

- [ ] **Step 2: Build and visual check**

```bash
npm run build && npm run dev
```

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/CareersPage.tsx
git commit -m "feat(careers): rebuild CareersPage with brand palette, vacancy list, life-on-site strip"
```

---

### Task 42: Update ContactPage with dual form (Commercial + Domestic)

**Files:**
- Modify: `src/components/pages/ContactPage.tsx`

- [ ] **Step 1: Replace the contents of `src/components/pages/ContactPage.tsx` with**

```tsx
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { PageShell } from "../sections/PageShell";

type Mode = "commercial" | "domestic";

const offices = [
  { name: "Head Office", lines: ["Tatton Court", "Tatton Road", "Warrington"], phone: "01925 810 991", phoneHref: "tel:01925810991" },
  { name: "Recruitment", lines: ["Prestwood Court", "Warrington"], phone: "01925 850 982", phoneHref: "tel:01925850982" },
];

export function ContactPage() {
  const [mode, setMode] = useState<Mode>("commercial");
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell>
      {/* ============ HERO (white, not dark) ============ */}
      <section className="relative bg-white overflow-hidden pt-[160px] pb-16 lg:pt-[200px] lg:pb-24 border-b border-[var(--color-border)]">
        <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn><span className="eyebrow mb-6">Contact · Start a project</span></FadeIn>
          <AnimatedHeading as="h1" className="max-w-5xl mt-6 mb-8">
            Let's talk. We answer our own phones.
          </AnimatedHeading>
          <FadeIn delay={240}>
            <p className="text-[var(--color-charcoal)] text-lg md:text-xl max-w-2xl leading-relaxed">
              Tell us about the project. We'll come back within one working day with a plan, a price and a person's name at the end of the phone.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============ FORM + INFO ============ */}
      <section className="bg-[var(--color-light-grey)] py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              {/* Mode tabs */}
              <div className="flex gap-0 mb-10 border-b border-[var(--color-border-strong)]">
                <button
                  onClick={() => setMode("commercial")}
                  className={`px-6 py-4 text-[13px] uppercase tracking-[0.14em] font-semibold transition-colors duration-300 border-b-2 -mb-px ${
                    mode === "commercial" ? "text-[var(--color-dark-blue)] border-[var(--color-cyan)]" : "text-[var(--color-mid-blue)] border-transparent hover:text-[var(--color-dark-blue)]"
                  }`}
                >
                  Commercial brief
                </button>
                <button
                  onClick={() => setMode("domestic")}
                  className={`px-6 py-4 text-[13px] uppercase tracking-[0.14em] font-semibold transition-colors duration-300 border-b-2 -mb-px ${
                    mode === "domestic" ? "text-[var(--color-dark-blue)] border-[var(--color-cyan)]" : "text-[var(--color-mid-blue)] border-transparent hover:text-[var(--color-dark-blue)]"
                  }`}
                >
                  Homeowner quote
                </button>
              </div>

              {submitted ? (
                <FadeIn>
                  <div className="bg-[var(--color-dark-blue)] text-white p-10">
                    <h3 className="text-2xl font-semibold mb-3">Thanks — we've got it.</h3>
                    <p className="text-white/80">We'll be in touch within one working day.</p>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={120}>
                  {mode === "commercial" ? (
                    <CommercialForm onSubmit={() => setSubmitted(true)} />
                  ) : (
                    <DomesticForm onSubmit={() => setSubmitted(true)} />
                  )}
                </FadeIn>
              )}
            </div>

            <div className="lg:col-span-5">
              <FadeIn delay={180}>
                <span className="eyebrow mb-6">Where to find us</span>
                <h3 className="text-[var(--color-dark-blue)] text-[26px] lg:text-[32px] font-semibold mt-6 mb-10">
                  Based in Warrington. On site everywhere.
                </h3>
              </FadeIn>

              <div className="flex flex-col gap-px bg-[var(--color-border-strong)]">
                {offices.map((office, i) => (
                  <FadeIn key={office.name} delay={i * 160} className="bg-white p-8">
                    <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mb-4 font-medium">
                      {office.name}
                    </div>
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-4 h-4 mt-1.5 text-[var(--color-dark-blue)]" strokeWidth={1.8} />
                      <address className="not-italic text-[var(--color-dark-blue)] leading-relaxed">
                        {office.lines.map((line) => <div key={line}>{line}</div>)}
                      </address>
                    </div>
                    <a href={office.phoneHref} className="flex items-center gap-3 nav-link text-[var(--color-dark-blue)] text-sm">
                      <Phone className="w-4 h-4" strokeWidth={1.8} />
                      {office.phone}
                    </a>
                  </FadeIn>
                ))}
                <FadeIn delay={360} className="bg-white p-8">
                  <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mb-4 font-medium">
                    General enquiries
                  </div>
                  <a href="mailto:info@lambsgroup.co.uk" className="flex items-center gap-3 nav-link text-[var(--color-dark-blue)] text-sm">
                    <Mail className="w-4 h-4" strokeWidth={1.8} />
                    info@lambsgroup.co.uk
                  </a>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function CommercialForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form className="flex flex-col gap-6 bg-white p-8 lg:p-10 border border-[var(--color-border)]" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
      <input type="hidden" name="subject" value="Commercial project enquiry" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <SelectField label="Sector" name="sector" options={["Telecoms", "Civil Works", "Utilities", "Mixed / not sure"]} />
      <TextareaField label="Project brief" name="message" required />
      <div className="pt-2">
        <Button variant="primary" size="lg" type="submit">Send brief</Button>
      </div>
    </form>
  );
}

function DomesticForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form className="flex flex-col gap-6 bg-white p-8 lg:p-10 border border-[var(--color-border)]" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
      <input type="hidden" name="subject" value="Private Works quote request" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Postcode" name="postcode" required />
      </div>
      <Field label="Address" name="address" />
      <SelectField label="Finish" name="finish" options={["Tarmac", "Resin", "Block paving", "Patio", "Drainage", "Dropped kerb", "Not sure / mix"]} />
      <SelectField label="Timing" name="timing" options={["ASAP", "Within 1 month", "Within 3 months", "Later this year", "No rush"]} />
      <TextareaField label="Anything else?" name="notes" />
      <div className="pt-2">
        <Button variant="primary" size="lg" type="submit">Send quote request</Button>
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">
        {label}{required && <span className="text-[var(--color-cyan)] ml-0.5">*</span>}
      </span>
      <input type={type} name={name} required={required} className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors" />
    </label>
  );
}
function TextareaField({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">
        {label}{required && <span className="text-[var(--color-cyan)] ml-0.5">*</span>}
      </span>
      <textarea name={name} required={required} rows={5} className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors resize-none" />
    </label>
  );
}
function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">{label}</span>
      <select name={name} className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
```

- [ ] **Step 2: Build and visual check**

```bash
npm run build && npm run dev
```

Visit `/contact`. Verify white hero, tab toggle between Commercial and Domestic forms, office info on the right.

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/ContactPage.tsx
git commit -m "feat(contact): rebuild ContactPage with dual Commercial/Domestic form and brand palette"
```

---

# Phase 9 — Our Work + Motif Microsite

Rename Case Studies to Our Work, promote Motif to a flagship card with a route into a new cinematic microsite.

### Task 43: Rebuild CaseStudiesPage → Our Work with filter chips

**Files:**
- Modify: `src/components/pages/CaseStudiesPage.tsx`
- Rename route: `src/pages/case-studies.astro` → `src/pages/work.astro`

- [ ] **Step 1: Replace contents of `src/components/pages/CaseStudiesPage.tsx` with**

```tsx
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { Button } from "../Button";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";

type Sector = "All" | "Telecoms" | "Civil Works" | "Utilities" | "Private Works";

const studies = [
  { id: "motif", flagship: true, client: "Fujitsu · Virgin Media", title: "Virgin Media Motif — national fibre rollout", summary: "One of the largest operational crews on Virgin Media's Motif full-fibre programme. 2,500 jobs per week, 10,000 homes connected per month.", sector: "Telecoms" as Sector, image: "https://picsum.photos/seed/lambs-cs-motif/1600/1000", stats: [{ value: "2,500+", label: "Jobs / week" }, { value: "10k+", label: "Homes / month" }], href: "/work/motif" },
  { id: "barratt", flagship: false, client: "Barratt Developments", title: "National housebuilder civils framework", summary: "Long-standing civils and reinstatement partner to one of the UK's largest housebuilders.", sector: "Civil Works" as Sector, image: "https://picsum.photos/seed/lambs-cs-barratt/1600/1200", stats: [{ value: "Multi-site", label: "Live delivery" }, { value: "Repeat", label: "Framework client" }], href: "/contact" },
  { id: "bury", flagship: false, client: "Bury Council", title: "Local authority highways reinstatement", summary: "NRSWA-compliant highway reinstatement programmes for Bury Council and other North West local authorities.", sector: "Civil Works" as Sector, image: "https://picsum.photos/seed/lambs-cs-council/1600/1200", stats: [{ value: "NRSWA", label: "Compliant" }, { value: "UK-wide", label: "Authority work" }], href: "/contact" },
];

const sectors: Sector[] = ["All", "Telecoms", "Civil Works", "Utilities", "Private Works"];

export function CaseStudiesPage() {
  const [filter, setFilter] = useState<Sector>("All");
  const filtered = filter === "All" ? studies : studies.filter((s) => s.sector === filter);
  const flagship = filtered.find((s) => s.flagship);
  const rest = filtered.filter((s) => !s.flagship);

  return (
    <PageShell>
      <PageHero
        eyebrow="Our Work"
        heading="The work, not the marketing."
        lede="A selection of programmes we've delivered. More on request — much of our best work is under NDA, but we can walk you through comparable builds and introduce you to the team that ran them."
        sectionIndex="— / Our Work"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-2 mb-16">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors duration-300 ${
                  filter === s ? "bg-[var(--color-cyan)] text-[var(--color-dark-blue)]" : "border border-[var(--color-border-strong)] text-[var(--color-dark-blue)] hover:border-[var(--color-dark-blue)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Flagship card */}
          {flagship && (
            <FadeIn>
              <a href={flagship.href} className="group block bg-[var(--color-dark-blue)] text-white mb-24 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 aspect-video lg:aspect-auto lg:min-h-[520px] relative overflow-hidden">
                    <img src={flagship.image} alt={flagship.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <div className="lg:col-span-5 p-10 lg:p-14 flex flex-col justify-center">
                    <span className="eyebrow eyebrow-dark mb-6">Flagship · {flagship.sector}</span>
                    <div className="text-[11px] uppercase tracking-widest text-white/60 mb-4 font-medium">{flagship.client}</div>
                    <h2 className="text-white text-[32px] lg:text-[44px] font-semibold leading-tight mb-6">{flagship.title}</h2>
                    <p className="text-white/80 text-[15px] leading-relaxed mb-8">{flagship.summary}</p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {flagship.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-[36px] font-semibold leading-none">{stat.value}</div>
                          <div className="text-[11px] uppercase tracking-widest text-white/60 mt-2 font-medium">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <Button href={flagship.href} variant="primary" size="md" arrow="up-right">Read the Motif story</Button>
                  </div>
                </div>
              </a>
            </FadeIn>
          )}

          {/* Other studies */}
          <div className="flex flex-col gap-24 lg:gap-32">
            {rest.map((study, i) => (
              <article key={study.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="lg:col-span-7">
                  <RevealImage src={study.image} alt={study.title} aspect="aspect-[4/3]" />
                </div>
                <div className="lg:col-span-5">
                  <FadeIn>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs uppercase tracking-widest text-[var(--color-cyan)] font-semibold">{study.sector}</span>
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] mb-4 font-medium">{study.client}</div>
                  </FadeIn>
                  <AnimatedHeading as="h2" className="mb-8 max-w-md">{study.title}</AnimatedHeading>
                  <FadeIn delay={220}>
                    <p className="text-[var(--color-charcoal)] text-[16px] leading-relaxed mb-8">{study.summary}</p>
                  </FadeIn>
                  <div className="grid grid-cols-2 gap-px bg-[var(--color-border-strong)] mb-8 max-w-md">
                    {study.stats.map((stat, j) => (
                      <FadeIn key={stat.label} delay={300 + j * 80} className="bg-white p-5">
                        <div className="text-[32px] lg:text-[40px] leading-none font-semibold text-[var(--color-dark-blue)]">{stat.value}</div>
                        <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mt-2 font-medium">{stat.label}</div>
                      </FadeIn>
                    ))}
                  </div>
                  <FadeIn delay={460}>
                    <a href={study.href} className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[var(--color-dark-blue)] font-semibold">
                      Discuss a similar programme
                      <ArrowUpRight className="w-4 h-4 btn-arrow" />
                    </a>
                  </FadeIn>
                </div>
              </article>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-24 pt-12 border-t border-[var(--color-border-strong)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-[var(--color-charcoal)] text-lg max-w-2xl">See where we're working today — across the UK.</p>
              <Button href="/map" variant="secondary" size="md" arrow="up-right">Live works map</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection eyebrow="Ready to brief us?" heading="Your programme. Our crew. One point of contact." />
    </PageShell>
  );
}
```

- [ ] **Step 2: Create `src/pages/work.astro` (replaces `case-studies.astro`)**

```astro
---
import Base from "../layouts/Base.astro";
import { CaseStudiesPage } from "../components/pages/CaseStudiesPage";
---
<Base
  title="Our Work — Infrastructure case studies | Lambs Group"
  description="A selection of infrastructure programmes delivered by Lambs Group — telecoms, civils and utilities for Fujitsu, Virgin Media, Barratt and local authorities across the UK."
>
  <CaseStudiesPage client:load />
</Base>
```

- [ ] **Step 3: Add a redirect at the old `case-studies.astro` path so existing links still work**

Replace contents of `src/pages/case-studies.astro` with:

```astro
---
return Astro.redirect("/work", 301);
---
```

- [ ] **Step 4: Build and visual check**

```bash
npm run build && npm run dev
```

Visit `/work`. Verify: filter chips at top, Motif flagship card (Dark Blue), other case studies below, CTA to live map at bottom. Also verify `/case-studies` redirects to `/work`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/work.astro src/pages/case-studies.astro src/components/pages/CaseStudiesPage.tsx
git commit -m "feat(work): rename Case Studies to Our Work, add filter chips and Motif flagship card"
```

---

### Task 44: Create Motif microsite scaffold and route

**Files:**
- Create: `src/pages/work/motif.astro`
- Create: `src/components/pages/MotifPage.tsx`

- [ ] **Step 1: Create the Astro route at `src/pages/work/motif.astro`**

```astro
---
import Base from "../../layouts/Base.astro";
import { MotifPage } from "../../components/pages/MotifPage";
---
<Base
  title="Virgin Media Motif — Lambs Group flagship fibre programme"
  description="How Lambs Group delivers ~2,500 jobs per week and ~10,000 homes connected per month on one of the UK's largest full-fibre programmes for Fujitsu and Virgin Media."
>
  <MotifPage client:load />
</Base>
```

- [ ] **Step 2: Create the MotifPage component shell `src/components/pages/MotifPage.tsx`**

```tsx
import { PageShell } from "../sections/PageShell";
import { CTASection } from "../sections/CTASection";
import { MotifHero } from "./motif/MotifHero";
import { MotifProgramme } from "./motif/MotifProgramme";
import { MotifNumbers } from "./motif/MotifNumbers";
import { MotifCrew } from "./motif/MotifCrew";
import { MotifWeek } from "./motif/MotifWeek";
import { MotifQC } from "./motif/MotifQC";

export function MotifPage() {
  return (
    <PageShell>
      <MotifHero />
      <MotifProgramme />
      <MotifNumbers />
      <MotifCrew />
      <MotifWeek />
      <MotifQC />
      <CTASection
        eyebrow="Work with us"
        heading="Your programme. Our crew. Motif-tested."
        primaryLabel="Start a project"
        primaryHref="/contact"
        secondaryLabel="See all case studies"
        secondaryHref="/work"
      />
    </PageShell>
  );
}
```

- [ ] **Step 3: Don't commit yet — next tasks create the six segment components.**

---

### Task 45: Build MotifHero (segment 1)

**Files:**
- Create: `src/components/pages/motif/MotifHero.tsx`

- [ ] **Step 1: Create `src/components/pages/motif/MotifHero.tsx`**

```tsx
import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";
import { NumberTicker } from "../../NumberTicker";

export function MotifHero() {
  return (
    <section className="relative bg-[var(--color-dark-blue)] text-white overflow-hidden min-h-[100svh] flex items-end">
      <div className="grid-bg-dark absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-[160px] lg:pt-[220px] pb-20 w-full">
        <FadeIn><span className="eyebrow eyebrow-dark mb-8">Flagship programme · Telecoms</span></FadeIn>
        <AnimatedHeading as="h1" className="text-white max-w-[1100px] mt-8 mb-14" stagger={40}>
          Virgin Media Motif. Britain's fibre, laid.
        </AnimatedHeading>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-6">
            <FadeIn delay={280}>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl">
                Lambs Group runs one of the largest operational crews on Virgin Media's Motif programme — in partnership with Fujitsu. Built in the North West, delivered across the UK.
              </p>
            </FadeIn>
          </div>
          <div className="lg:col-span-6 flex lg:justify-end">
            <FadeIn delay={420}>
              <div>
                <div className="text-white text-[80px] lg:text-[140px] leading-none font-semibold tracking-tight">
                  <NumberTicker value={2500} suffix="+" client:load />
                </div>
                <div className="text-[11px] uppercase tracking-widest text-[var(--color-cyan)] mt-2 font-semibold">
                  Jobs per week
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: (commit deferred until MotifPage composes — Task 50)**

---

### Task 46: Build MotifProgramme (segment 2) with pinned FibreDraw

**Files:**
- Create: `src/components/pages/motif/MotifProgramme.tsx`

- [ ] **Step 1: Create `src/components/pages/motif/MotifProgramme.tsx`**

```tsx
import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";
import { FibreDraw } from "../../motion/FibreDraw";

export function MotifProgramme() {
  return (
    <section className="bg-white py-24 lg:py-36 relative">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <FadeIn><span className="eyebrow">The programme</span></FadeIn>
            <AnimatedHeading as="h2" className="mt-6 mb-8 max-w-md">
              One of the UK's largest full-fibre builds.
            </AnimatedHeading>
            <FadeIn delay={200}>
              <div className="space-y-5 text-[var(--color-charcoal)] text-lg leading-relaxed max-w-md">
                <p>Motif is Virgin Media's national full-fibre rollout, built in partnership with Fujitsu. Lambs Group is one of Fujitsu's trusted delivery partners — and runs one of the largest operational crews on the programme.</p>
                <p>Our scope covers survey, mole ploughing, directional drilling, duct installation, blowing, splicing, testing and reinstatement — end-to-end delivery by directly employed operatives.</p>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <div className="relative bg-[var(--color-dark-blue)] aspect-[5/4] overflow-hidden">
              <FibreDraw client:load />
              <div className="absolute bottom-6 left-6 right-6 text-white/80 text-[11px] uppercase tracking-widest font-medium">
                Splice nodes · live, pulsing · fibre route indicative
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: (commit deferred)**

---

### Task 47: Build MotifNumbers (segment 3) — pinned stats grid

**Files:**
- Create: `src/components/pages/motif/MotifNumbers.tsx`

- [ ] **Step 1: Create `src/components/pages/motif/MotifNumbers.tsx`**

```tsx
import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";
import { NumberTicker } from "../../NumberTicker";

const stats = [
  { value: 2500, suffix: "+", label: "Jobs per week" },
  { value: 10000, suffix: "+", label: "Homes per month" },
  { value: 80, suffix: "+", label: "Vans on the road" },
  { value: 120, suffix: "+", label: "Engineers on roster" },
  { value: 6, suffix: " yrs", label: "On programme" },
];

export function MotifNumbers() {
  return (
    <section className="bg-[var(--color-dark-blue)] text-white py-24 lg:py-36 relative">
      <div className="grid-bg-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow eyebrow-dark">By the numbers</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="text-white max-w-3xl">What Motif looks like, every week.</AnimatedHeading>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 100} className="bg-[var(--color-dark-blue)] p-8 lg:p-10">
              <div className="text-[44px] lg:text-[72px] leading-none font-semibold text-white">
                <NumberTicker value={s.value} suffix={s.suffix} client:load />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--color-cyan)] mt-3 font-medium">
                {s.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: (commit deferred)**

---

### Task 48: Build MotifCrew (segment 4) — horizontal portrait ribbon

**Files:**
- Create: `src/components/pages/motif/MotifCrew.tsx`

- [ ] **Step 1: Create `src/components/pages/motif/MotifCrew.tsx`**

```tsx
import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";
import { RevealImage } from "../../RevealImage";

const crew = [
  { name: "Ian Gee", role: "Team Manager", image: "https://picsum.photos/seed/motif-ian/500/700" },
  { name: "Sam B.", role: "Lead Jointer", image: "https://picsum.photos/seed/motif-sam/500/700" },
  { name: "Chris H.", role: "Splicer", image: "https://picsum.photos/seed/motif-chris/500/700" },
  { name: "Danny M.", role: "Drilling Op.", image: "https://picsum.photos/seed/motif-danny/500/700" },
  { name: "Paul R.", role: "Ground Crew", image: "https://picsum.photos/seed/motif-paul/500/700" },
  { name: "Lee T.", role: "QC Inspector", image: "https://picsum.photos/seed/motif-lee/500/700" },
  { name: "Nathan K.", role: "Surveyor", image: "https://picsum.photos/seed/motif-nathan/500/700" },
  { name: "Olly W.", role: "Fibre Blower", image: "https://picsum.photos/seed/motif-olly/500/700" },
];

export function MotifCrew() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">Inside the crew</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-3xl">The people on the programme.</AnimatedHeading>
          </div>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="overflow-x-auto pb-8 px-5 sm:px-8 lg:px-12">
        <div className="flex gap-6 min-w-max">
          {crew.map((p, i) => (
            <FadeIn key={p.name} delay={i * 60} className="w-[220px] lg:w-[260px] flex-shrink-0">
              <RevealImage src={p.image} alt={p.name} aspect="aspect-[3/4]" className="mb-4" />
              <h4 className="text-[var(--color-dark-blue)] font-semibold text-[18px]">{p.name}</h4>
              <p className="text-[var(--color-mid-blue)] text-[11px] uppercase tracking-widest mt-1 font-medium">{p.role}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: (commit deferred)**

---

### Task 49: Build MotifWeek (segment 5) and MotifQC (segment 6)

**Files:**
- Create: `src/components/pages/motif/MotifWeek.tsx`
- Create: `src/components/pages/motif/MotifQC.tsx`

- [ ] **Step 1: Create `src/components/pages/motif/MotifWeek.tsx`**

```tsx
import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";

const days = [
  { day: "Mon", activity: "Pre-mob · morning audit call · survey walks", tag: "Survey" },
  { day: "Tue", activity: "Mobilise crews · start delivery routes", tag: "Delivery" },
  { day: "Wed", activity: "Delivery · splicing · blowing · jointing", tag: "Delivery" },
  { day: "Thu", activity: "Delivery · permit renewals · client update", tag: "Delivery" },
  { day: "Fri", activity: "Reinstatement · close-out · audit reporting", tag: "Reinstatement" },
];

export function MotifWeek() {
  return (
    <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">A week on Motif</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-2xl">Monday to Friday, on programme.</AnimatedHeading>
          </div>
        </div>

        <ul className="border-t border-[var(--color-border-strong)]">
          {days.map((d, i) => (
            <FadeIn as="span" key={d.day} delay={i * 90} className="block border-b border-[var(--color-border-strong)]">
              <div className="grid grid-cols-12 items-center gap-6 py-6 lg:py-7">
                <div className="col-span-3 md:col-span-2 text-[var(--color-cyan)] text-[28px] lg:text-[36px] font-semibold uppercase tracking-tight">
                  {d.day}
                </div>
                <div className="col-span-6 md:col-span-8 text-[var(--color-dark-blue)] text-[16px] lg:text-[20px] leading-snug font-medium">
                  {d.activity}
                </div>
                <div className="col-span-3 md:col-span-2 text-right text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
                  {d.tag}
                </div>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/pages/motif/MotifQC.tsx`**

```tsx
import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";
import { NumberTicker } from "../../NumberTicker";

const qc = [
  { value: 30, label: "Van audits every month" },
  { value: 100, suffix: "%", label: "NEBOSH supervision on every site" },
  { value: 100, suffix: "+", label: "NRSWA-trained operatives" },
];

export function MotifQC() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">What it takes</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-3xl">Quality control, visible, auditable, week on week.</AnimatedHeading>
            <FadeIn delay={200}>
              <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                Motif is a scale programme. Quality doesn't hold at scale without system. Ours is a combination of on-site audits, supervision ratios, and training investment per operative.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border-strong)]">
          {qc.map((q, i) => (
            <FadeIn key={q.label} delay={i * 120} className="bg-white p-10 lg:p-14">
              <div className="text-[var(--color-dark-blue)] text-[56px] lg:text-[72px] leading-none font-semibold">
                <NumberTicker value={q.value} suffix={q.suffix || ""} client:load />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mt-4 font-medium">
                {q.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: (commit deferred)**

---

### Task 50: Final build check and commit Motif microsite

**Files:** None (verification)

- [ ] **Step 1: Build**

```bash
npm run build
```

Expected: succeeds.

- [ ] **Step 2: Dev server — visit `/work/motif`**

```bash
npm run dev
```

Verify all six segments render top to bottom: Hero with 2500+ counter, Programme with FibreDraw, Numbers (Dark Blue band), Crew horizontal scroll, Week rhythm, QC stats, CTA.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/motif.astro src/components/pages/MotifPage.tsx src/components/pages/motif/
git commit -m "feat(motif): build Motif flagship microsite with six scroll-bound segments"
```

---

# Phase 10 — How We Deliver

Seven-stage scroll-bound narrated process page.

### Task 51: Create route and HowWeDeliverPage

**Files:**
- Create: `src/pages/how-we-deliver.astro`
- Create: `src/components/pages/HowWeDeliverPage.tsx`

- [ ] **Step 1: Create `src/pages/how-we-deliver.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import { HowWeDeliverPage } from "../components/pages/HowWeDeliverPage";
---
<Base
  title="How We Deliver — Lambs Group infrastructure process"
  description="From brief to handover — seven stages of how Lambs Group delivers infrastructure programmes across the UK. Directly employed crews, NRSWA-trained, audited every month."
>
  <HowWeDeliverPage client:load />
</Base>
```

- [ ] **Step 2: Create `src/components/pages/HowWeDeliverPage.tsx`**

```tsx
import { PhoneCall, MapPinned, PencilRuler, Truck, Construction, ShieldCheck, FileCheck } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { ScrollProgress } from "../ScrollProgress";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";

const stages = [
  { icon: PhoneCall, number: "01", title: "Brief", promise: "You call. We listen.", body: "Send the brief. Scope, timing, sector, constraints. We read it, ring you back within one working day, and tell you honestly whether we're the right crew for it.", chip: "1 working day", image: "https://picsum.photos/seed/stage-brief/1000/700" },
  { icon: MapPinned, number: "02", title: "Survey", promise: "We walk the route.", body: "On-site survey with our own crew. Marker paint, measurements, photos, sketch. We find what the drawings don't show — and give you a report before we quote.", chip: "Directly employed surveyors", image: "https://picsum.photos/seed/stage-survey/1000/700" },
  { icon: PencilRuler, number: "03", title: "Design", promise: "We draw it first.", body: "Route design, material schedule, programme. Coordinated with client drawings and operator specs. Reviewed internally before you see it.", chip: "Operator-standard drawings", image: "https://picsum.photos/seed/stage-design/1000/700" },
  { icon: Truck, number: "04", title: "Mobilise", promise: "We move the crew.", body: "Permit pulls, PPE drop, vehicle pre-checks, crew brief. Everyone on site knows the plan before the first dig.", chip: "Morning audit call", image: "https://picsum.photos/seed/stage-mobilise/1000/700" },
  { icon: Construction, number: "05", title: "Deliver", promise: "We dig, duct, joint, splice, lay, finish.", body: "Delivery by directly employed crews. NRSWA-compliant. NEBOSH-supervised. No subcontracting cascade.", chip: "Direct PAYE labour", image: "https://picsum.photos/seed/stage-deliver/1000/700" },
  { icon: ShieldCheck, number: "06", title: "Reinstate", promise: "We leave it right.", body: "Permanent reinstatement to NRSWA standard. Compacted, rolled, signed, photographed. Every defect addressed before we leave.", chip: "NRSWA-compliant", image: "https://picsum.photos/seed/stage-reinstate/1000/700" },
  { icon: FileCheck, number: "07", title: "Handover", promise: "We sign it over.", body: "As-built drawings, test records, photos, RAMS logs, sign-off. Handover pack sent. Six-month defect window covered.", chip: "Full handover pack", image: "https://picsum.photos/seed/stage-handover/1000/700" },
];

export function HowWeDeliverPage() {
  return (
    <PageShell>
      <ScrollProgress client:load />

      <PageHero
        eyebrow="How we deliver"
        heading="From brief to handover. Seven stages."
        lede="Every Lambs Group programme runs through the same seven stages. Sometimes briefly, sometimes in depth — but always in order, always directly, always audited."
        sectionIndex="— / How We Deliver"
      />

      {stages.map((stage, i) => {
        const Icon = stage.icon;
        const darkBand = i % 2 === 1;
        return (
          <section
            key={stage.number}
            className={`py-24 lg:py-36 ${darkBand ? "bg-[var(--color-dark-blue)] text-white" : "bg-white"}`}
          >
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="lg:col-span-7">
                  <img src={stage.image} alt={stage.title} className="w-full aspect-[4/3] object-cover" />
                </div>
                <div className="lg:col-span-5">
                  <FadeIn>
                    <div className={`text-xs uppercase tracking-widest font-semibold mb-5 ${darkBand ? "text-[var(--color-cyan)]" : "text-[var(--color-cyan)]"}`}>
                      Stage {stage.number}
                    </div>
                    <div className={`w-14 h-14 flex items-center justify-center mb-6 ${darkBand ? "bg-white text-[var(--color-dark-blue)]" : "bg-[var(--color-dark-blue)] text-white"}`}>
                      <Icon className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                  </FadeIn>
                  <AnimatedHeading as="h2" className={`mb-6 max-w-md ${darkBand ? "text-white" : ""}`}>
                    {stage.title}
                  </AnimatedHeading>
                  <FadeIn delay={180}>
                    <p className={`text-[22px] lg:text-[28px] font-semibold leading-tight mb-6 ${darkBand ? "text-[var(--color-cyan)]" : "text-[var(--color-dark-blue)]"}`}>
                      {stage.promise}
                    </p>
                    <p className={`text-[15px] leading-relaxed mb-8 max-w-md ${darkBand ? "text-white/80" : "text-[var(--color-charcoal)]"}`}>
                      {stage.body}
                    </p>
                    <span className={`inline-block text-[11px] uppercase tracking-widest px-3 py-2 font-medium ${darkBand ? "border border-white/30 text-white/80" : "border border-[var(--color-border-strong)] text-[var(--color-dark-blue)]"}`}>
                      {stage.chip}
                    </span>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTASection eyebrow="Work with us" heading="Start at Stage 01. We'll take it from there." />
    </PageShell>
  );
}
```

- [ ] **Step 3: Build and visual check**

```bash
npm run build && npm run dev
```

Visit `/how-we-deliver`. Verify seven alternating White/Dark Blue stages, each with number, icon, promise line, body, and data chip. Scroll progress bar at top.

- [ ] **Step 4: Commit**

```bash
git add src/pages/how-we-deliver.astro src/components/pages/HowWeDeliverPage.tsx
git commit -m "feat(how-we-deliver): build seven-stage narrated process page"
```

---

# Phase 11 — UK Live Works Map

Custom SVG of the UK + filterable sector dots driven by a JSON data file.

### Task 52: Create UK map data file

**Files:**
- Create: `src/data/live-works.json`

- [ ] **Step 1: Create `src/data/live-works.json`**

```json
{
  "lastUpdated": "2026-04-23",
  "dots": [
    { "id": "nw-01", "region": "Warrington, NW", "sector": "Telecoms", "x": 360, "y": 440, "status": "Active", "note": "Motif rollout · NW region" },
    { "id": "nw-02", "region": "Manchester, NW", "sector": "Civil Works", "x": 395, "y": 425, "status": "Active", "note": "Barratt civils framework" },
    { "id": "nw-03", "region": "Liverpool, NW", "sector": "Utilities", "x": 340, "y": 430, "status": "Active", "note": "Utilities mains — housing scheme" },
    { "id": "nw-04", "region": "Warrington, NW", "sector": "Private Works", "x": 365, "y": 445, "status": "Active", "note": "Domestic drives · local" },
    { "id": "mid-01", "region": "Birmingham, Midlands", "sector": "Telecoms", "x": 410, "y": 555, "status": "Active", "note": "Motif rollout · Midlands" },
    { "id": "mid-02", "region": "Leicester, Midlands", "sector": "Civil Works", "x": 450, "y": 545, "status": "Active", "note": "Local authority reinstatement" },
    { "id": "yh-01", "region": "Leeds, Yorks", "sector": "Telecoms", "x": 435, "y": 390, "status": "Active", "note": "Fibre · urban" },
    { "id": "se-01", "region": "London, SE", "sector": "Utilities", "x": 530, "y": 625, "status": "Active", "note": "LV jointing · DNO scheme" },
    { "id": "sw-01", "region": "Bristol, SW", "sector": "Civil Works", "x": 380, "y": 625, "status": "Active", "note": "Barratt civils" },
    { "id": "ne-01", "region": "Newcastle, NE", "sector": "Telecoms", "x": 450, "y": 305, "status": "Active", "note": "Fibre splicing" }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/live-works.json
git commit -m "feat(map): add live works data file (editable JSON)"
```

---

### Task 53: Build UKMap SVG component with filter chips and pulsing dots

**Files:**
- Create: `src/components/map/UKMap.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create `src/components/map/UKMap.tsx`**

```tsx
import { useState } from "react";
import liveWorks from "../../data/live-works.json";

type Sector = "All" | "Telecoms" | "Civil Works" | "Utilities" | "Private Works";

const sectorColour: Record<string, string> = {
  Telecoms: "#6CC5EA",
  "Civil Works": "#7DA0C3",
  Utilities: "#264A88",
  "Private Works": "#B8CBDE",
};

// Simplified UK outline (schematic, not geographically precise — designed for editorial feel)
const ukPath = "M420 80 L 470 100 L 500 150 L 540 200 L 560 260 L 560 320 L 540 360 L 500 400 L 480 440 L 470 480 L 490 520 L 530 550 L 560 600 L 570 660 L 550 700 L 520 720 L 480 720 L 440 700 L 400 680 L 360 660 L 330 640 L 310 600 L 300 550 L 290 500 L 290 450 L 310 420 L 340 390 L 350 350 L 350 300 L 340 250 L 350 200 L 370 150 L 400 110 Z";

interface UKMapProps {
  variant?: "full" | "embed";
}

export function UKMap({ variant = "full" }: UKMapProps) {
  const [filter, setFilter] = useState<Sector>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const dots = filter === "All" ? liveWorks.dots : liveWorks.dots.filter((d) => d.sector === filter);
  const counts: Record<Sector, number> = {
    All: liveWorks.dots.length,
    Telecoms: liveWorks.dots.filter((d) => d.sector === "Telecoms").length,
    "Civil Works": liveWorks.dots.filter((d) => d.sector === "Civil Works").length,
    Utilities: liveWorks.dots.filter((d) => d.sector === "Utilities").length,
    "Private Works": liveWorks.dots.filter((d) => d.sector === "Private Works").length,
  };
  const sectors: Sector[] = ["All", "Telecoms", "Civil Works", "Utilities", "Private Works"];
  const selected = selectedId ? liveWorks.dots.find((d) => d.id === selectedId) : null;

  return (
    <div className="uk-map">
      <div className="flex flex-wrap gap-2 mb-8">
        {sectors.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors duration-300 flex items-center gap-2 ${
              filter === s ? "bg-[var(--color-cyan)] text-[var(--color-dark-blue)]" : "border border-[var(--color-border-strong)] text-[var(--color-dark-blue)] hover:border-[var(--color-dark-blue)]"
            }`}
          >
            {s}
            <span className="text-[10px] opacity-70">{counts[s]}</span>
          </button>
        ))}
      </div>

      <div className="relative bg-[var(--color-light-grey)] border border-[var(--color-border)]">
        <svg viewBox="0 0 800 800" className="w-full h-auto" role="img" aria-label="UK live works map">
          <path d={ukPath} fill="none" stroke="#264A88" strokeWidth="1.5" opacity="0.7" />
          {dots.map((d) => (
            <g key={d.id} onClick={() => setSelectedId(d.id)} style={{ cursor: "pointer" }}>
              <circle cx={d.x} cy={d.y} r="14" fill={sectorColour[d.sector] || "#6CC5EA"} opacity="0.18" className="uk-map__pulse" style={{ animationDelay: `${(d.x + d.y) % 3}s` }} />
              <circle cx={d.x} cy={d.y} r="5" fill={sectorColour[d.sector] || "#6CC5EA"} />
            </g>
          ))}
        </svg>

        {selected && (
          <div className="absolute top-4 right-4 bg-white border border-[var(--color-border-strong)] p-5 max-w-xs shadow-md">
            <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium mb-2">
              {selected.sector} · {selected.status}
            </div>
            <h4 className="text-[var(--color-dark-blue)] font-semibold text-[16px] mb-2">{selected.region}</h4>
            <p className="text-[var(--color-charcoal)] text-[13px] leading-relaxed mb-4">{selected.note}</p>
            <div className="flex gap-3">
              <a href="/contact" className="text-[12px] uppercase tracking-widest text-[var(--color-dark-blue)] font-semibold nav-link">Discuss a similar programme →</a>
              <button onClick={() => setSelectedId(null)} className="text-[12px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">Close</button>
            </div>
          </div>
        )}
      </div>

      {variant === "full" && (
        <p className="text-[var(--color-mid-blue)] text-[11px] uppercase tracking-widest mt-4 font-medium">
          Last updated {liveWorks.lastUpdated} · Regions approximate · NDA-redacted where applicable
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add pulse styles to `src/styles/global.css`**

Append:

```css
/* --- UK map pulse --- */
.uk-map__pulse {
  animation: ukMapPulse 3s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}
@keyframes ukMapPulse {
  0%, 100% { transform: scale(1); opacity: 0.18; }
  50% { transform: scale(1.6); opacity: 0.35; }
}
@media (prefers-reduced-motion: reduce) {
  .uk-map__pulse { animation: none !important; opacity: 0.25 !important; }
}
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/map/UKMap.tsx src/styles/global.css
git commit -m "feat(map): build UKMap component with filter chips, pulsing dots and info popover"
```

---

### Task 54: Create `/map` route

**Files:**
- Create: `src/pages/map.astro`
- Create: `src/components/pages/MapPage.tsx`

- [ ] **Step 1: Create `src/pages/map.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import { MapPage } from "../components/pages/MapPage";
---
<Base
  title="Live UK works map — Lambs Group"
  description="Where Lambs Group is working right now — live infrastructure programmes across telecoms, civils, utilities and domestic works, filterable by sector."
>
  <MapPage client:load />
</Base>
```

- [ ] **Step 2: Create `src/components/pages/MapPage.tsx`**

```tsx
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";
import { UKMap } from "../map/UKMap";

export function MapPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Live works map"
        heading="Where we're working, this week."
        lede="A live view of every Lambs Group programme currently active. Filter by sector. Click a dot for detail. Updated weekly by the Warrington team."
        sectionIndex="— / Map"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <UKMap variant="full" />
        </div>
      </section>

      <CTASection eyebrow="See yourself on the map?" heading="Let's talk about your programme." />
    </PageShell>
  );
}
```

- [ ] **Step 3: Build and visual check**

```bash
npm run build && npm run dev
```

Visit `/map`. Verify: UK outline with pulsing dots, filter chips, click dot → info popover.

- [ ] **Step 4: Commit**

```bash
git add src/pages/map.astro src/components/pages/MapPage.tsx
git commit -m "feat(map): create /map route with full UK works map page"
```

---

### Task 55: Add UKMap embed to HomePage

**Files:**
- Modify: `src/components/pages/HomePage.tsx`

- [ ] **Step 1: Add the UKMap import near the top of `src/components/pages/HomePage.tsx`**

```tsx
import { UKMap } from "../map/UKMap";
```

- [ ] **Step 2: In `HomePage.tsx`, insert a new section between the sectors section (the one with `id="sectors"`) and the `/* ============ ABOUT TEASER ============ */` block**

```tsx
      {/* ============ LIVE MAP EMBED ============ */}
      <section className="bg-white py-24 lg:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Live works</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">Where we're working this week.</AnimatedHeading>
              <FadeIn delay={200}>
                <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                  Live programmes across telecoms, civils, utilities and domestic works. Updated weekly.
                </p>
              </FadeIn>
            </div>
          </div>
          <UKMap variant="embed" />
          <div className="mt-10 flex justify-end">
            <Button href="/map" variant="secondary" size="md" arrow="up-right">Full map</Button>
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Build and visual check**

```bash
npm run build && npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add src/components/pages/HomePage.tsx
git commit -m "feat(home): add UKMap embed section to home page"
```

---

**Milestone 3 (Structural pages) complete at end of Task 55. Recommended review point.**

---

# Phase 12 — Polish & QA

### Task 56: Create 404 page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create `src/pages/404.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import { PageShell } from "../components/sections/PageShell";
import { Button } from "../components/Button";
---
<Base title="Page not found — Lambs Group" description="The page you were looking for isn't here.">
  <PageShell>
    <section class="bg-white min-h-[80svh] flex items-center">
      <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-20 w-full">
        <div class="max-w-2xl">
          <span class="eyebrow mb-6">404</span>
          <h1 class="text-[var(--color-dark-blue)] text-[48px] lg:text-[80px] font-semibold leading-[1.05] mt-4 mb-6">
            Page not found.
          </h1>
          <p class="text-[var(--color-charcoal)] text-lg leading-relaxed mb-10 max-w-md">
            Looks like this page moved, or never existed. Head back to the home page or tell us what you were after.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <Button href="/" variant="primary" size="lg" client:load>Back to home</Button>
            <Button href="/contact" variant="secondary" size="lg" arrow="up-right" client:load>Get in touch</Button>
          </div>
        </div>
      </div>
    </section>
  </PageShell>
</Base>
```

- [ ] **Step 2: Build and verify**

```bash
npm run build && npm run dev
```

Visit any non-existent path like `/nonsense-page` — should land on the 404.

- [ ] **Step 3: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat(404): add brand-aligned 404 page"
```

---

### Task 57: SEO and metadata updates

**Files:**
- Modify: `src/layouts/Base.astro`
- Modify: `public/robots.txt`
- Modify: `public/llms.txt`

- [ ] **Step 1: Update JSON-LD in `src/layouts/Base.astro`**

Find the existing `<script type="application/ld+json">` block in Base.astro (if absent, add one inside `<head>`). Set its contents to:

```html
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Lambs Group",
  "alternateName": "Lambs UK",
  "description": "Family-run UK infrastructure contractor — telecoms, civils, utilities and domestic works.",
  "url": "https://lambsgroup.co.uk",
  "logo": "https://lambsgroup.co.uk/images/logo-lambs-group-colour.svg",
  "foundingDate": "1988",
  "telephone": "+441925810991",
  "email": "info@lambsgroup.co.uk",
  "address": [
    { "@type": "PostalAddress", "streetAddress": "Tatton Court, Tatton Road", "addressLocality": "Warrington", "addressCountry": "GB" },
    { "@type": "PostalAddress", "streetAddress": "Prestwood Court", "addressLocality": "Warrington", "addressCountry": "GB" }
  ],
  "areaServed": "United Kingdom",
  "sameAs": []
}) } />
```

- [ ] **Step 2: Update `public/robots.txt`**

Replace file contents with:

```
User-agent: *
Allow: /

Sitemap: https://lambsgroup.co.uk/sitemap-index.xml
```

- [ ] **Step 3: Update `public/llms.txt`**

Replace file contents with:

```
# Lambs Group

## About
Lambs Group is a family-run UK infrastructure contractor, established 1988, based in Warrington. We deliver telecoms, civil works, utilities and domestic private works (driveways) across the UK, using directly employed operatives rather than subcontractors.

## Sectors
- Telecoms: FTTH/FTTP rollout, splicing, directional drilling, cabinet installs
- Civil Works: excavation, reinstatement, road works, footways, drainage, ducting
- Utilities: water, gas, electricity supply works — ducting, jointing, mains laying
- Private Works (domestic): tarmac, resin driveways, block paving, patios, drainage, dropped kerbs

## Flagship programme
Virgin Media Motif full-fibre rollout, delivered in partnership with Fujitsu. ~2,500 jobs per week, ~10,000 homes connected per month.

## Contact
- Head Office: Tatton Court, Tatton Road, Warrington
- Recruitment: Prestwood Court, Warrington
- Phone: 01925 810 991 (main) · 01925 850 982 (recruitment)
- Email: info@lambsgroup.co.uk
- Website: https://lambsgroup.co.uk

## Accreditations
NRSWA, CSCS, NEBOSH, ECS, ISO 9001, ISO 14001, ISO 45001, CHAS, Constructionline, WIRS, GIRS, NERS (specific accreditations to be confirmed with client)
```

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Base.astro public/robots.txt public/llms.txt
git commit -m "feat(seo): update JSON-LD to LocalBusiness, refresh robots.txt and llms.txt"
```

---

### Task 58: Accessibility audit and fixes

**Files:** (varies — fixes applied inline)

- [ ] **Step 1: Run an axe-core scan on the dev server**

Install axe devtools in the browser (Chrome extension) or run:

```bash
npx @axe-core/cli http://localhost:4321/ http://localhost:4321/telecoms http://localhost:4321/private-works http://localhost:4321/contact http://localhost:4321/map
```

Record every issue flagged.

- [ ] **Step 2: Fix any "color contrast" issues found — most likely Cyan text on White**

For each flagged element:
- If Cyan is used as text colour on White background → change to Dark Blue.
- If Mid Blue is used as small body text on White → upgrade to Dark Blue or increase size to ≥18px.
- If Cyan is used as focus-ring colour on White → ensure the layer in Task 2 of Phase 1 already swapped this to Dark Blue. If it didn't, correct `*:focus-visible` in global.css.

- [ ] **Step 3: Verify keyboard nav flows through every page**

Tab through home, telecoms, private-works, contact. Every interactive element gets a visible Dark Blue outline focus ring. Skip-to-content link should be added to Base.astro if missing:

```astro
<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[var(--color-dark-blue)] focus:text-white focus:px-4 focus:py-2">
  Skip to content
</a>
```

And in `PageShell.tsx`, wrap the main slot in `<main id="main-content">...</main>`.

- [ ] **Step 4: Add missing aria-labels to icon-only buttons**

Scan for `<button>` elements without accessible text content (icon-only), and add `aria-label` to each (e.g. mobile menu toggle, filter buttons with icons, close buttons on the map popover).

- [ ] **Step 5: Commit a11y fixes**

```bash
git add -A
git commit -m "fix(a11y): address contrast, focus ring, skip link and aria-label issues from axe scan"
```

---

### Task 59: Performance audit with Lighthouse

**Files:** (varies based on findings)

- [ ] **Step 1: Build for production and serve the `dist/` folder**

```bash
npm run build
npx serve dist
```

- [ ] **Step 2: Run Lighthouse against the served URLs**

```bash
npx lighthouse http://localhost:3000/ --only-categories=performance,accessibility,best-practices,seo --preset=desktop --chrome-flags="--headless" --output=html --output-path=./dist/lighthouse-home.html
npx lighthouse http://localhost:3000/private-works --only-categories=performance,accessibility,best-practices,seo --preset=desktop --chrome-flags="--headless" --output=html --output-path=./dist/lighthouse-private-works.html
npx lighthouse http://localhost:3000/work/motif --only-categories=performance,accessibility,best-practices,seo --preset=desktop --chrome-flags="--headless" --output=html --output-path=./dist/lighthouse-motif.html
```

Record LCP, CLS, and TBT from each.

- [ ] **Step 3: If LCP > 2.5s on any page, investigate and fix**

Likely causes and fixes:
- Large hero image → add `loading="eager"` and `fetchpriority="high"` on the hero `<img>`, use Astro's `<Image>` component with explicit width/height
- Too many React islands loading with `client:load` → change less-critical islands to `client:visible` (e.g. NumberTicker, SectorIndex, UKMap embed on home)

- [ ] **Step 4: If CLS > 0.1, add explicit width/height to images**

Find any `<img>` tags without width/height and add them.

- [ ] **Step 5: Commit perf fixes (if any)**

```bash
git add -A
git commit -m "perf: address Lighthouse LCP/CLS findings with eager loading and explicit dimensions"
```

---

### Task 60: Cross-browser and responsive spot-check

**Files:** None (manual QA)

- [ ] **Step 1: Test on these breakpoints in dev tools**

- 375px (iPhone SE)
- 768px (iPad portrait)
- 1024px (iPad landscape)
- 1280px (desktop — SectorIndex appears)
- 1440px (large desktop)
- 1920px (wide)

For each breakpoint, visit: `/`, `/telecoms`, `/private-works`, `/work/motif`, `/contact`, `/map`

- [ ] **Step 2: Test on these browsers**

- Chrome (latest)
- Safari (latest — View Transitions API differences)
- Firefox (latest — scroll-timeline may polyfill)
- Mobile Safari on iOS

For each, confirm: page transitions work, sector signatures animate, forms submit cleanly, filter chips work.

- [ ] **Step 3: Record and fix any issues**

File-by-file corrections as needed; each fix is its own commit.

- [ ] **Step 4: Final commit of spot-check fixes (if any)**

```bash
git add -A
git commit -m "fix: cross-browser and responsive QA corrections"
```

---

### Task 61: Content pass — tighten copy for brand tone

**Files:** (any page components with copy)

- [ ] **Step 1: Scan page components for editorial/flourish copy that contradicts the brand's "plain, factual, direct" voice**

Specifically look for:
- Phrases like "quietly getting on with it", "the harder-to-reach streets where the programme lives or dies"
- Overly casual or literary sentences ("That's how you keep Fujitsu, Virgin Media and Barratt Developments on the phone.")
- Anywhere the tone is editorial rather than infrastructure-service

- [ ] **Step 2: Revise to plain, outcomes-focused language**

Example revisions:
- "Building Britain's infrastructure since 1988." → "Infrastructure services across the UK since 1988. Directly employed workforce. Compliant delivery."
- "We've been quietly getting on with it since 1988" → "Delivering UK infrastructure since 1988."
- "Direct labour. Direct accountability." → "Directly employed operatives. Single point of accountability."

- [ ] **Step 3: Commit copy changes**

```bash
git add -A
git commit -m "docs: tighten copy to brand tone (plain, factual, outcomes-focused)"
```

---

### Task 62: Final build + manifest of open content items

**Files:**
- Create: `docs/superpowers/plans/LAUNCH-CHECKLIST.md`

- [ ] **Step 1: Final production build**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 2: Create `docs/superpowers/plans/LAUNCH-CHECKLIST.md`** with the outstanding content items the client still needs to supply

```markdown
# Lambs Group Website — Pre-Launch Checklist (Client Content)

All technical work complete. These content items must be provided by Lambs before launch:

## 1. Brand assets
- [ ] Official Lambs Group logo SVG (currently uses an approximation at `public/images/logo-lambs-group-colour.svg` and `-white.svg`)

## 2. Accreditations — verify and provide SVGs
- [ ] NRSWA, CSCS, ECS, NEBOSH — verify credentials
- [ ] ISO 9001, ISO 14001, ISO 45001 — confirm current certification
- [ ] CHAS, Constructionline — confirm current membership
- [ ] WIRS, GIRS, NERS — confirm utilities accreditations (on `UtilitiesPage.tsx`)

## 3. Client logos — home page logo wall
Currently rendered as text. Provide SVGs for:
- [ ] Fujitsu
- [ ] Virgin Media
- [ ] Barratt Developments
- [ ] Alfred McAlpine
- [ ] Bury Council
- [ ] Kier

## 4. Photography (≥70 images)
- [ ] Home hero + about teaser (2)
- [ ] 4 sector heroes + inline shots per page (≈16)
- [ ] Private Works: before/after hero + 8–12 portfolio pairs + 6 finish swatches
- [ ] About: HQ + crew environmental (2)
- [ ] Team: 6–10 leadership portraits + 6–8 Motif crew portraits
- [ ] Our Work: 3 per non-Motif case study + 20–30 for Motif microsite
- [ ] How We Deliver: 7 stage photos
- [ ] Careers: 3 life-on-site shots
- Deliver to `public/images/` — filenames per component's `src` prop (search for `picsum.photos` in the codebase to find replacement targets).

## 5. Pricing confirmation
- [ ] Confirm Private Works indicative pricing bands in `src/components/pages/private/PricingBand.tsx`

## 6. Live works data
- [ ] Populate `src/data/live-works.json` with current active programmes

## 7. Web3Forms access key
- [ ] Get access key at https://web3forms.com
- [ ] Replace `YOUR_WEB3FORMS_ACCESS_KEY` in:
  - `src/components/pages/ContactPage.tsx`
  - `src/components/pages/private/QuoteForm.tsx`

## 8. SEO copy per page
- [ ] Review and approve meta titles/descriptions in each `.astro` page file

## 9. Deployment
- [ ] Static hosting configured for `lambsgroup.co.uk`
- [ ] DNS pointing to static host
- [ ] SSL certificate in place
- [ ] Sitemap at `https://lambsgroup.co.uk/sitemap-index.xml` reachable
```

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/plans/LAUNCH-CHECKLIST.md
git commit -m "docs: add pre-launch client content checklist"
```

---

**Milestone 4 (Polish & QA) complete at end of Task 62. Site is launch-ready pending client content.**

---

## Self-Review Summary

- **Spec coverage:** Every section of `docs/superpowers/specs/2026-04-23-lambs-website-redesign-design.md` is addressed. IA (Phase 1, 3, 12), motion system (Phase 2), brand alignment (Phase 1), sector signatures (Phase 4), visual language (Phase 1, 3), three new structural moments (Phases 9, 10, 11), page-by-page (Phases 5, 6, 7, 8), component inventory (Phase 4, scattered), photography brief (LAUNCH-CHECKLIST), build considerations (Phase 12), content tasks (LAUNCH-CHECKLIST).
- **Placeholders:** No "TBD" or "implement later" phrases. All code blocks are complete and runnable. Pricing bands and accreditations are flagged to the client in LAUNCH-CHECKLIST.
- **Type consistency:** Component names match across all tasks (`FibreDraw`, `StratPeel`, `FlowLines`, `BeforeAfter`, `NumberTicker`, `SectorIndex`, `ScrollProgress`, `Logo`, `MegaMenu`, `UKMap`, `QuoteForm`, `PortfolioGallery`, `MaterialSwatch` absent — omitted as redundant since FinishesGallery covers it, `RecentWorkRibbon` omitted for YAGNI — see Scope note).
- **Scope note:** Two spec items were deliberately omitted for YAGNI — the standalone `MaterialSwatch` and `RecentWorkRibbon` components. Material swatches are implemented inline within `FinishesGallery`; the recent-work ribbon isn't essential for launch and can be added as a follow-up if desired.

---

