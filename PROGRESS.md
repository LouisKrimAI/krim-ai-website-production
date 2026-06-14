# PROGRESS — krim.ai

*Governing docs: `docs/KRIM-BRIEF.md` (spine) · `docs/SITEMAP-IA.md` (map) ·
`docs/BUILD-PLAN.md` (process) · `docs/design-tokens.md` (tokens) ·
`docs/krim-content.md` (facts) · `docs/copy/*.md` (page copy) ·
`docs/geo-kit.md` (JSON-LD/GEO). All seven are present and reconciled.
Protocol: one work order at a time → restate in ≤5 lines → build → self-check
at 1440/390 → review panel → preview → STOP for approval.*

Repo: `/Users/louis/Documents/krim-website-clean`, branch **`recovery`** (HEAD on
this branch is the working line; `main` is the pre-work baseline). Next.js 14 App
Router at the repo root.

## Done — Phase A (foundation + homepage)

- **Migration:** Next.js 14 App Router at the root (the old Vite app retired from
  the tree, preserved in git history). TS + Tailwind + Framer Motion; SSG.
- **Design system:** `docs/design-tokens.md` → `app/globals.css` (CSS vars + glass
  utilities `.glass`/`.glass-quiet`/`.glass-cyan`/`.glass-mint`, `.lume` hover) +
  `tailwind.config.ts` (colours, scaled-up type, radii, easings).
- **Core library** in `components/`: `ui.tsx` (Section · Eyebrow · GlassCard · Stat ·
  CTA), `Reveal`, `KrimLogoAnimated` (the real inverted animated mark + "KRIM"),
  `WaveOrb`, `SiteHeader` (scroll-revealed nav with Domains menu), `SiteFooter`
  (tagline + compact nav + real LinkedIn/X logos).
- **Homepage `/`** from `docs/copy/homepage.md` — 9 sections: hero (orb grows in →
  logo → words; banner reveals on scroll), The challenge (glass cards), Three powers,
  flywheel, Platform layers (Kula/Kira → Kupa → Karta → Kriya → Kendra), Domains
  (4 doors), Intelligence by policy (Pramāṇa/Doṣa/Yogyatā + ProofPanel component),
  integrations marquee (15 real logos), Recognition strip, Close.
- **SEO/GEO seeds:** Organization JSON-LD, robots.txt (AI crawlers allowed),
  metadata + canonical, tab title "Krim - Safe Superintelligence".
- **Image assets staged** under `public/images/`: `backdrops/` (4), `domains/`
  (lending, government, enterprise, msme), `heritage/` (mithila-mandala),
  `og/og-default.png`, `textures/glow-soft.png`. Not yet wired into pages.

## Done — docs reconciliation pass

- `geo-kit.md` rewritten to the brief: domain-neutral "operating system for regulated
  operations," dropped "five layers," Kula = enterprise NL interface / Kira = customer
  advisor, dead `/product` → `/platform`, LinkedIn + X filled in `sameAs`.
- `krim-content.md`: descriptor + CTA reconciled to the brief ("Book a demo");
  "twelve attributes" → eleven; "five layers" → "the named layers"; recognition
  (NVIDIA Inception · DPIIT · STPI) added as confirmed facts.
- `design-tokens.md`: retired the stale "pinhead" hero timeline (defer to the brief).
- `platform.md`: dropped the rigid "five parts" framing; name the real parts.
- `/company`: no leadership/team section for now (company.md + SITEMAP reconciled).
- Critic agents + `/audit` + `/review` + `CLAUDE.md`: rewired from the absent
  Playwright MCP to the Claude Preview MCP.

## Decisions locked (do not re-ask)
- Keep all four domains: Lending · Government · Large Enterprise · MSME.
- Don't force a layer count — name the real parts (incl. Kupa, Krimkar).
- No `/company` team section yet.
- Recognition marks confirmed (NVIDIA Inception · DPIIT · STPI); official badge
  images to be supplied → `public/images/badges/`.

## Known gaps / pending
- Nav + sub-page routes (`/platform`, `/lending`, …) 404 until their phases ship.
- Vercel deploy needs a one-time `npx vercel login` (project linked: `krim-website-clean`).
- "Book a demo" → `mailto:sales@krim.ai` until `/contact` ships.
- Pending assets: recognition badge images; integration logos for the fact-sheet
  systems (Finacle, Genesys, NICE, WhatsApp…); Substack/Medium/Instagram social URLs;
  `/blog` feed URLs; OG wordmark/tagline overlay (compose in code at 1200×630).

## Next (per SITEMAP-IA / BUILD-PLAN build order)
1. ✅ Foundation + homepage → gate (done)
2. `/platform` + sub-pages (kendra, kriya, karta, kula, kira) — sets every pattern
3. The spectacular hero, as its own work order (largely built; refine)
4. `/lending` → `/epistemic-ai` → `/contact` (funnel live)
5. `/government` → `/enterprise` → `/msme` → `/trust` → `/architecture` → `/research`
   → `/services` → `/company` → `/blog` → 404
6. QA pass (`/audit`) + Lighthouse
