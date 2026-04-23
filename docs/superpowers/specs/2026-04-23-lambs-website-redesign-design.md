# Lambs Group — Website Design Spec

**Status:** Design approved, awaiting user review before implementation planning.
**Date:** 2026-04-23
**Project root:** `/Users/lee/Development/websites/lambs`
**Brand guide source:** `docs/brand/Brand Guidelines.pdf`

---

## 1. Objective

Elevate the Lambs Group website to best-in-sector for UK infrastructure contractors. Three explicit goals from the brief:

1. Modern transitions that *pop*.
2. Professional layout.
3. Structure that fits each sector rather than one generic template.

Photography is not available yet. The design defines the photo *slots* and the treatment applied to them; Lambs provides the photography when ready.

**Approach locked through client dialogue:**
- Audience: **Balanced commercial** — enterprise operators (Fujitsu, Virgin Media), developers (Barratt, Alfred McAlpine, Kier), local authorities. Recruitment as a proper but secondary stream. Domestic (driveways / Private Works) added as a fourth sector.
- Motion ambition: **Tier C — Cinematic & statement.** Scroll-bound motion, pinned sections, full SPA-style page transitions with shared element hand-off.
- Sector differentiation: **Medium** — shared grid, shared typography, shared 95% of the visual language, but one bespoke motion signature per sector that expresses the trade.
- Personality: **Clean professional infrastructure** (revised after brand guide ingestion) — polished corporate-reliability, not gritty-industrial. Visual reference sits closer to Arup / Atkins than to an editorial design studio.
- Three new structural moments added: Live UK Works Map, Motif case-study microsite, "How We Deliver" process page.

---

## 2. Information Architecture

### 2.1 Primary navigation

- **Sectors** (mega-menu, two tiers):
  - *Commercial:* Telecoms · Civil Works · Utilities
  - *Domestic:* Private Works
- **Our Work** (renamed from Case Studies) — Motif microsite at the top, other case studies below, links through to the live map
- **How We Deliver** *(new)* — scroll-bound seven-stage process page
- **About** (dropdown: About / Team / Careers)
- **Contact** (as a primary button, not a nav link)

### 2.2 Secondary moments

- **Live UK Map** — CTA from Home, Our Work, and footer. Shareable URL for tenders.
- **Recruitment line** — secondary phone-line CTA on Careers and nav corner.

### 2.3 URL structure

| Route | Purpose |
|---|---|
| `/` | Home |
| `/telecoms` · `/civil-works` · `/utilities` · `/private-works` | Four sector pages |
| `/work` | Our Work index |
| `/work/motif` | Motif microsite |
| `/work/<slug>` | Other case studies |
| `/how-we-deliver` | Process page |
| `/map` | Live UK works map |
| `/about` · `/team` · `/careers` | About cluster |
| `/contact` | Commercial + domestic forms |
| `/404` | Error page (new; currently absent) |

---

## 3. Brand Alignment (from Brand Guidelines.pdf)

### 3.1 Colour tokens

| Token | Hex | Role |
|---|---|---|
| Dark Blue | `#264A88` | Headings, navigation, authority surfaces |
| Cyan | `#6CC5EA` | Buttons, links, highlights, interactive hover, motion accents |
| Mid Blue | `#7DA0C3` | Supporting rules, quiet labels, large-text captions |
| Light Grey | `#F5F5F7` | Alternate section backgrounds |
| Charcoal | `#242A38` | Deep body text / occasional high-contrast surface |
| White | `#FFFFFF` | Default background |

**Usage rule from the guide:** Cyan capped at ~10–15% of any layout. This is enforced in the design: Cyan appears only on primary CTAs, active states, motion highlights, and focus rings.

### 3.2 Typography

- **Inter 600 SemiBold** — all headings H1–H4
- **Inter 400 Regular** — body, captions, labels
- **Max two fonts per piece**, per the guide. Space Grotesk and JetBrains Mono from the scaffold are removed.
- Small-caps labels (replacing mono captions): Inter 400 · 11px · `letter-spacing: 0.14em` · `text-transform: uppercase` · colour Mid Blue.

### 3.3 Logo

- Official `LAMBS GROUP` wordmark (Dark Blue `LAMBS` + Cyan `GROUP` + mark). Replaces the scaffold's text + yellow square.
- White variant used on Dark Blue or Charcoal surfaces.
- Clear space = height of the 'L' on all sides.
- Navbar uses the coloured lockup on light backgrounds; white version on Dark Blue navbar.

### 3.4 Tone of voice

- Plain English, factual, direct.
- Emphasise safety, compliance, reliability.
- Focus on outcomes for clients.
- Copy pass required on existing scaffolded text to remove editorial flourishes that contradict the brand voice.

### 3.5 What is explicitly OUT (previously in the scaffold)

- Hi-vis yellow `#FFD60A` everywhere — replaced by Cyan `#6CC5EA`
- Diagonal hazard stripes (`hivis-stripe`)
- Space Grotesk and JetBrains Mono typefaces
- Dark-ink dominant hero (replaced by White hero as default; Dark Blue reserved for high-gravitas moments only)
- "Engineer's annotation" mono caption aesthetic
- "Surveyor's crop marks" image corner treatment
- Half-tone dot-screen photo overlay

---

## 4. Motion System

Three layers. No animation library dependency. Runtime cost < 5kb.

### 4.1 Layer 1 — Page transitions (Astro View Transitions API)

- **Within a sector family** (e.g. Home → Telecoms, Telecoms → Civils): the sector-header block (eyebrow + H1 + sector index) is a **shared element** — fades and slides from its home-page card position up to the new page's hero position. Remainder of the current page exits down; new page enters up.
- **Cross-context navigation** (e.g. Services → About): full page wipe — a Dark Blue panel sweeps up from the bottom over 500ms, new page mounts behind it, panel retracts upward.
- `prefers-reduced-motion: reduce` → instant cross-fade.
- Transition is skippable if the user scrolls mid-animation.

### 4.2 Layer 2 — Scroll-bound motion

- **Pinned sections** on the Motif microsite and How-We-Deliver page — section sticks, inner layer progresses as the user scrolls past.
- **Number counters** on stat blocks tick up from 0 to final value when they enter the viewport.
- **Image parallax** on case study pages and the home hero — foreground scrolls slightly slower than the page.
- **Progress bar** in the nav for long pages (Motif, Process, Case studies). Mid Blue rule with Cyan fill.
- Implementation: native CSS `scroll-timeline` where supported, IntersectionObserver polyfill for older browsers.

### 4.3 Layer 3 — Enter/exit motion (existing primitives pushed)

Existing components kept:
- `AnimatedHeading` — word stagger (tightened from 70ms → 40ms)
- `RevealImage` — clip-path wipe; wipe line recoloured Cyan
- `FadeIn` — block fade

### 4.4 Accessibility & performance budget

- `prefers-reduced-motion: reduce` fully respected across all three layers.
- Target 60fps on mid-range mobile; transforms and opacity only — no layout thrashing.
- All motion composited on GPU.

---

## 5. Sector Motion Signatures

Each sector page carries one bespoke motion signature in its hero plus 2–3 quiet echoes through the page.

### 5.1 Telecoms — the drawn fibre line

- **Hero:** a single thin Cyan SVG line draws itself diagonally across the hero (~1.4s). Three "splice points" along the line pulse outward every 3s. Line exits the bottom of the hero and reappears threading through section breaks further down.
- **Scroll echo:** case-study section traces a simplified UK route map as the user scrolls; each job point lights up in sequence.
- **Micro:** stat blocks pulse Cyan on viewport entry.

### 5.2 Civil Works — the stratified peel-back

- **Hero:** cross-section of ground at base of hero shows labelled strata (40mm wearing course · binder · Type 1 sub-base · subgrade). Each layer peels back sequentially to reveal the trench profile below. Layer colours use Light Grey → Mid Blue → Charcoal gradient; a single Cyan edge tick marks the "live" layer.
- **Scroll echo:** section dividers use a thin Cyan edge over layered texture bands.
- **Micro:** service cards hover-reveal a cutaway illustration of the finished work.

### 5.3 Utilities — the three flowing lines

- **Hero:** three parallel horizontal lines (Dark Blue = power · Mid Blue = water · Cyan = gas). Intermittent pulses flow along each line's length, like a live infrastructure diagram. Lines continue as leading edges for each sub-section.
- Differentiation by colour AND line style (solid · dashed · dotted) as belt-and-braces.
- **Scroll echo:** each service card (water / gas / power) uses its coloured edge pulse.
- **Micro:** flowing pulse along the top edge of buttons on hover.

### 5.4 Private Works — the before/after wipe

- **Hero:** split image — tired cracked tarmac left, finished resin drive right, Cyan vertical divider with handle. On load, divider auto-sweeps left-to-right; user can then drag to compare.
- **Scroll echo:** portfolio tiles enter as "before" and wipe to "after" as they settle into view.
- **Micro:** material swatches (resin colours, block patterns) reveal surface texture on hover.

### 5.5 Shared fallbacks

- All four signatures have a reduced-motion fallback: static diagrams or still images.
- All scale down on mobile to single-axis or simplified forms.
- None loop continuously — each plays once per page load, plus on-demand interaction.

---

## 6. Visual Language (revised for brand guide)

### 6.1 Layout chrome

- 12-col grid, 1400px max width (unchanged from scaffold).
- **Fixed left-rail page indicator** at desktop (≥1280px): thin 1px Mid Blue vertical line, sector index in Inter 11px Mid Blue small-caps (e.g. `01 / TELECOMS`), small 6px Cyan dot that slides down the rail as the user scrolls through sections. Signature site element; present on every interior page. Hidden on mobile.
- **Section headers** use a full-width hairline Mid Blue rule with a small Cyan tick at the left edge.

### 6.2 Section rhythm

- Default hero: **White background** with Dark Blue H1, Mid Blue eyebrow, Charcoal lede.
- **Dark Blue hero** reserved for a single high-gravitas moment — the Motif microsite opener (`/work/motif`). White/Cyan type and a subtle Mid Blue grid overlay. Not used on any other top-of-page hero. Dark Blue may still appear as a *mid-page band* elsewhere (About values block, Our Work Motif card, footer), but not as a page hero except on the Motif microsite.
- Sections alternate White → Light Grey → White → Dark Blue (impact band) → White. Breathing rhythm.
- Footer: Dark Blue `#264A88` background, white type, Cyan CTAs, white-variant Lambs Group logo.

### 6.3 Buttons

| Variant | Background | Text | Hover |
|---|---|---|---|
| Primary | Cyan `#6CC5EA` | Dark Blue | 1–2px lift + darker Cyan shade |
| Secondary | Transparent | Dark Blue + 1.5px Dark Blue outline | Cyan fill slides in from left |
| Tertiary | Transparent | Dark Blue | Cyan underline slides in |
| Outline-white (on Dark Blue) | Transparent | White + 1.5px white outline | White fill, Dark Blue text |

All buttons have the existing `.btn-arrow` micro-motion on hover (arrow translates 5px right).

### 6.4 Form treatment

- Field labels: Mid Blue small-caps Inter 11px.
- Inputs: transparent with bottom border (1px Mid Blue at 40%). Focus: bottom border → Dark Blue 2px. Cursor: Charcoal.
- Submit button: primary variant (Cyan fill, Dark Blue text).
- Confirmation panel: Dark Blue background, white type, Cyan check icon.

### 6.5 Imagery treatment

- Rectangular/squared aspect ratios. Hairline Mid Blue border where photos sit against White.
- On Dark Blue sections: photos bleed edge-to-edge.
- Image reveals use the existing `RevealImage` clip-path wipe; wipe line is Cyan.
- Photo captions (when used): Mid Blue small-caps, left-aligned below image, format `[Programme · Location · Year]`.

---

## 7. New Structural Moments

### 7.1 Live UK Works Map — `/map`

- Stylised **custom SVG** of the UK in Dark Blue outline on White (or Light Grey) background. Not Google / Mapbox.
- Active programmes plotted as Cyan dots that pulse gently at varied cadences.
- Filter chips top-right: All · Telecoms · Civil Works · Utilities · Private Works. Active filter: Cyan fill, Dark Blue text. Inactive: Mid Blue outline, Dark Blue text.
- Counts per filter: "23 active fibre jobs · NW" etc. Values come from an editable JSON data file in the repo (`src/data/live-works.json`).
- Click a dot → small card: programme name (redacted for NDA where applicable), sector, status, last update. "Discuss a similar programme" CTA.
- Home-page embed version: smaller, less interactive, CTA through to `/map`.
- Privacy: dots represent regions or approximate postcodes; client names only where explicit permission given.

### 7.2 Motif microsite — `/work/motif`

Seven scroll-bound pinned segments:

1. **Hero** — Dark Blue full-bleed. Headline "Virgin Media Motif · Britain's fibre, laid." + "2,500+" counter tick-up.
2. **The programme** — pinned section with Cyan fibre line drawing across a simplified UK; splice nodes light up as copy reveals.
3. **By the numbers** — pinned stat grid (jobs/week · homes/month · vans · engineers · years on programme). Counters animate on scroll-in.
4. **Inside the crew** — vertical-scroll drives horizontal ribbon of 6–8 key Motif team portraits. Names, roles, one-line credits.
5. **A week on Motif** — Monday–Friday rhythm panel: survey · delivery · reinstatement · morning audit calls.
6. **What it takes** — QC story panel: 30 van audits/month, NRSWA retraining, NEBOSH supervision. Data-rich.
7. **Close** — CTAs to "See all case studies" and "Start a programme".

Reduced-motion fallback: segments become normal stacked sections; no pinning, no counters.

### 7.3 How We Deliver — `/how-we-deliver`

Seven-stage narrated scroll page. Each stage is a pinned section with a top-of-viewport progress bar (Mid Blue rule, Cyan fill) that advances as the user scrolls.

| # | Stage | Promise | Photo |
|---|---|---|---|
| 01 | Brief | "You call. We listen." | Phone on desk |
| 02 | Survey | "We walk the route." | Crew with clipboards / marker paint |
| 03 | Design | "We draw it first." | Route drawing |
| 04 | Mobilise | "We move the crew." | Van convoy or PPE drop |
| 05 | Deliver | "We dig, duct, joint, splice." | Work in action |
| 06 | Reinstate | "We leave it right." | Finished reinstatement |
| 07 | Handover | "We sign it over." | As-builts + sign-off |

Each stage: big Dark Blue stage number · Inter SemiBold display stage name · one-line promise · short paragraph · one photo · one data chip (e.g. `NRSWA-trained`, `30 audits/mo`, `NEBOSH-accredited`).

---

## 8. Page-by-Page Notes

### 8.1 Home (`/`)

- White hero with Dark Blue H1 (replaces current dark-ink hero). Mid Blue eyebrow. Charcoal lede.
- **Four sector cards** (not three): Telecoms · Civil Works · Utilities · Private Works. Subtle `[DOMESTIC]` divider label before the Private Works card. Cards are White with Dark Blue headings, Cyan icon accent on hover, Mid Blue border.
- **UK Live Map embed** as a new section between Sectors and About teaser.
- Stats strip on White with Dark Blue numbers; counters animate on scroll.
- Clients logo wall with real SVG client logos (Fujitsu, Virgin Media, Barratt, Alfred McAlpine, Bury Council, Kier — currently text placeholders).
- About teaser (image left, copy right; White background).
- Recent-work ribbon before the footer: horizontal scrolling band of 4–5 time-stamped thumbnails linking into Our Work / Map.
- Footer: Dark Blue background, white type, Cyan CTAs, full-colour Lambs Group wordmark (white variant).

### 8.2 Telecoms · Civil Works · Utilities

Shared pattern:
- Sector motion signature in the hero (Section 5).
- Fixed left-rail indicator at desktop (`01 / TELECOMS`, `02 / CIVIL WORKS`, `03 / UTILITIES`).
- `ServiceList` retains format; cards gain a 1px Cyan border slide-in on hover, Dark Blue heading brightens slightly.
- Case-study band: White background, Dark Blue headings, Cyan `+` glyph on stat values like `2,500+`.
- Accreditations strip: White, Mid Blue outline chips, Dark Blue text. **All accreditations currently marked placeholder — requires verification with client before launch.**

### 8.3 Private Works (new — `/private-works`)

- Hero: before/after wipe (Section 5.4) with Cyan divider handle.
- Services grid: 7 tiles — Tarmac · Resin · Block paving · Patios · Drainage · Dropped kerbs · Groundworks (3-3-1 desktop, 2x tablet, stacked mobile).
- **Finishes gallery** — material swatches (resin colours, paving patterns, kerb styles, patio stones) with texture reveal on hover. Cyan border on hovered tile.
- **Portfolio** — before/after gallery, 8–12 pairs at launch, filterable by type. Cyan filter chips.
- **Pricing guidance band** — "From £X per m²" strips per finish. Flagged as "indicative — quoted per project". Light Grey background.
- **Quote request form** (distinct from enterprise brief form): name, address, approx. area m², finish interest (Tarmac / Resin / Block paving / Patio / Drainage / Dropped kerb / Not sure), target timing, photo upload. Second-person label tone ("Your driveway", "Your postcode"). Cyan submit button.
- Testimonial row — homeowner reviews with name + postcode. Mid Blue quote marks.
- Coverage map — small embed on Light Grey. "North West + further by arrangement."

### 8.4 About (`/about`)

- Three-act structure (story / values / timeline) retained.
- **Values block** — Dark Blue background (was dark-ink in the scaffold); white Inter SemiBold values, Mid Blue eyebrow, Cyan number accents. Each value carries a compliance/reliability stat chip (`NEBOSH-accredited supervision`, `100+ directly-employed operatives`, `30 van audits/month`).
- Timeline — White background, Dark Blue year labels, Charcoal body. Cyan vertical line on the left that fills as the user scrolls through decades.
- Copy pass required to tighten toward brand voice: plain, factual, compliance-forward. Remove editorial flourishes ("We've been quietly getting on with it since 1988" → "Delivering infrastructure services across the UK since 1988. Directly employed workforce. Compliant delivery.").

### 8.5 Team (`/team`)

- Existing grid retained.
- New section: **"On the Motif crew"** — horizontal ribbon of the specific Motif team portraits, cross-linked from the Motif microsite.
- Each portrait: White background, Cyan divider under role label, Dark Blue SemiBold name.
- Uniform aspect ratio and lighting direction across all portraits (photography brief requirement).

### 8.6 Our Work (renamed from Case Studies — `/work`)

- **Motif** is the headline at the top — full-width Dark Blue hero card, Cyan CTA into the microsite. Visually bigger than other case studies to signal flagship.
- Other case studies below in alternating-image layout. White / Light Grey alternating backgrounds.
- Filter chips at the top: All · Telecoms · Civils · Utilities · Private Works. Cyan when selected.
- CTA to live map at the bottom: "See where we're working now →".

### 8.7 Careers (`/careers`)

- Scaffold retained; gains fixed left-rail indicator.
- Vacancies list: each row has a Cyan `→` indicator on hover. "Days since posted" tag in Mid Blue small-caps.
- "Life on site" photo strip: three documentary images of real crew. White background, Mid Blue divider.
- Recruitment phone CTA: solid Dark Blue button with Cyan phone icon.

### 8.8 Contact (`/contact`)

- **Dual form:** Commercial brief + Homeowner quote. Two-column split on desktop; tab toggle on mobile. Commercial is default on desktop load.
- Commercial form fields: Name · Company · Email · Phone · Sector · Project brief. Cyan submit.
- Homeowner form fields: Name · Address · Postcode · Email · Phone · Approx area m² · Finish interest · Target timing · Photo upload. Cyan submit.
- Hero: White with Dark Blue H1 (replaces current dark-ink hero).
- Phone lines: main line prominent, recruitment line clearly labelled as a separate number.
- Confirmation state: Dark Blue panel, white type, Cyan check icon.

### 8.9 404 (new)

- White background, Dark Blue "Page not found", Mid Blue hairline rule, Cyan "Back to home" button.

---

## 9. Component Inventory

### 9.1 Existing components retained (motion primitives, chrome)

- `AnimatedHeading` — stagger tightened to 40ms
- `RevealImage` — wipe line recoloured Cyan
- `FadeIn` — unchanged
- `Button` — palette re-mapped (Cyan primary, Dark Blue outline, etc.)
- `Navbar` — restyled to light/transparent default, Dark Blue when scrolled; replaces scaffold logo with official Lambs Group wordmark
- `Footer` — Dark Blue background, white type, Cyan CTAs; removes hi-vis stripe top edge
- `PageShell` · `PageHero` · `CTASection` · `StatStrip` · `ServiceList` — retained, restyled to brand palette
- `TrustPill` — retained, Cyan/Dark Blue variants

### 9.2 New components

| Component | Purpose |
|---|---|
| `ViewTransitionPanel` | Cross-context page transition curtain (Dark Blue sweep) |
| `ScrollProgress` | Top-of-viewport progress bar for long pages |
| `SectorIndex` | Fixed left-rail page indicator (≥1280px) |
| `BeforeAfter` | Draggable before/after image wipe (Private Works hero + portfolio tiles) |
| `StratPeel` | Civils hero stratified peel-back SVG component |
| `FibreDraw` | Telecoms SVG line-draw component with splice-node pulses |
| `FlowLines` | Utilities three-line flow SVG component |
| `LiveMap` | UK works map with filter chips and dot interactivity |
| `ProcessStages` | Scroll-bound pinned-section component for `/how-we-deliver` |
| `NumberTicker` | Scroll-bound counter component |
| `MegaMenu` | Two-tier sectors menu (Commercial / Domestic) |
| `QuoteForm` | Domestic quote-request form (separate from commercial brief form) |
| `PortfolioGallery` | Private Works before/after + finishes gallery with filter chips |
| `MaterialSwatch` | Finish-option tile with texture hover |
| `RecentWorkRibbon` | Horizontal scrolling time-stamped work strip (home page) |

---

## 10. Photography Brief

### 10.1 Style

- Documentary, not set-dressed. Real crew on real sites.
- Natural colour grade (no heavy desaturation, no half-tone, no raw-filmic).
- Overcast or golden-hour light preferred.
- PPE consistent and correct.
- Generous headroom on portraits; landscape shots leave room for captions or pull-copy overlays.

### 10.2 Volume (≈70 images minimum)

| Page | Images |
|---|---|
| Home | 1 hero landscape + 1 about teaser + 4 recent-work thumbs |
| 4 sector pages | 1 hero + 3 inline per page (~16 total) |
| Private Works | 1 before/after hero + 8–12 portfolio pairs + 6 finish swatches |
| About | 2 environmental shots (HQ + crew at work) |
| Team | 6–10 portraits, consistent lighting/framing |
| Our Work + case studies | ~3 per non-Motif case study + 20–30 for Motif microsite |
| `/how-we-deliver` | 7 stage photos matching the seven defined stages |
| Careers | 3 "life on site" documentary shots |

### 10.3 Delivery

- Images provided to `public/images/`.
- Served via Astro's `<Image>` component as AVIF with WebP fallback.
- LQIP placeholders for all hero images.
- All images replaceable without code changes.

---

## 11. Build Considerations

### 11.1 Stack (unchanged)

- Astro 6 + React 19 + Tailwind 4
- Astro's native View Transitions API for page transitions
- IntersectionObserver + native CSS `scroll-timeline` for scroll-bound motion
- No GSAP, no Framer Motion, no Lottie
- Web3Forms for both commercial and domestic forms
- Static output — GitHub Pages / Netlify / any static host

### 11.2 Accessibility

- Cyan `#6CC5EA` on White fails WCAG AA for small text. Cyan is used only as a **fill** with Dark Blue or Charcoal text on top. Never as Cyan text on White body copy.
- Dark Blue `#264A88` on White passes AA/AAA — primary text colour.
- Mid Blue `#7DA0C3` only for large captions (≥18px) or non-essential labels.
- Focus-visible rings on light surfaces: **Dark Blue** 2px outline + 2px offset (passes WCAG 2.2 non-text contrast). A Cyan outer halo may be layered as a visual flourish but is never the sole focus indicator. On Dark Blue surfaces, focus-visible uses Cyan 2px + white 1px inner ring.
- All motion respects `prefers-reduced-motion: reduce`.

### 11.3 Performance

- LCP < 2.5s on 4G
- CLS < 0.1
- View-Transitions set to ≤500ms, skippable on scroll
- Motion runtime < 5kb
- GPU-composited animations only (transforms + opacity)

### 11.4 SEO

- Per-page `seo_title` and `seo_description` from markdown frontmatter (content files currently empty — to be populated with brand-aligned copy).
- JSON-LD in `Base.astro` updated to `LocalBusiness` + `Organization` with the two Warrington addresses.
- `sitemap-index.xml` auto-generated.
- `robots.txt` sitemap URL → `https://lambsgroup.co.uk/sitemap-index.xml`.
- `llms.txt` populated with Lambs business facts.

---

## 12. Content Tasks (client responsibility, not part of build scope)

- Confirm and supply all accreditation logos / claims. Scaffold currently flags multiple placeholders: NRSWA, ISO 9001/14001/45001, CHAS, Constructionline, WIRS, GIRS, NERS, NEBOSH, CSCS, ECS.
- Real client SVG logos for the home logo wall (Fujitsu, Virgin Media, Barratt Developments, Alfred McAlpine, Bury Council, Kier).
- Provide ~70+ photos per §10.
- Confirm pricing guidance bands per Private Works finish.
- Confirm office addresses and phone numbers in the footer.
- Provide `live-works.json` data for the UK map.
- Approve SEO copy and meta descriptions per page.
- Copy pass on scaffolded text to align with brand tone (plain, factual, direct, compliance-forward).

---

## 13. What is explicitly OUT OF SCOPE

- CMS integration (static JSON files used where editable data is needed).
- Mapbox / Google Maps (custom SVG used instead).
- Animation libraries (GSAP, Framer Motion, Lottie — all rejected for performance).
- Gritty-industrial visual language (overridden by brand guide).
- Hi-vis yellow and hazard-stripe chrome from the scaffold (overridden by brand guide).
- Real-time data feeds (UK map reads from a manually-updated JSON file).
- E-commerce, booking, or scheduling functionality.
- Multilingual support.

---

## 14. Open items requiring client confirmation before the implementation plan

1. Accreditation list finalisation.
2. Official client logo SVGs.
3. Photography timeline and volume commitment.
4. Pricing bands for Private Works.
5. Final SEO copy per page.
6. Confirmation that the `LAMBS GROUP` wordmark (not just `LAMBS`) is the intended brand name in-site.
7. Domain / deployment confirmation (`lambsgroup.co.uk` set in `astro.config.mjs`).

These do not block the implementation plan from being written; they block launch.
