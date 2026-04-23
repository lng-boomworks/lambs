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

Deliver to `public/images/` — filenames per component's `src` prop (search for `picsum.photos` in the codebase to find replacement targets).

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

## 10. Accessibility and performance
- [ ] Lighthouse audit on production hosting (desktop + mobile)
- [ ] axe-core a11y scan across all 15 pages
- [ ] Cross-browser check (Chrome, Safari, Firefox, mobile Safari)
