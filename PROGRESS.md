# PROGRESS — krim.ai

*Governing docs: `docs/KRIM-BRIEF.md` (spine) · `docs/SITEMAP-IA.md` (map) ·
`docs/design-tokens.md` (tokens) · `docs/krim-content.md` (facts) ·
`docs/copy/*.md` (page copy) · `docs/geo-kit.md` (JSON-LD/GEO).
Protocol: one work order at a time → restate in ≤5 lines → build → self-screenshot
1440/390 + vision fix → panel one-liners → preview → STOP for approval.
`docs/BUILD-PLAN.md` referenced by the Phase A work order is not in the repo —
flagged; proceeding per SITEMAP-IA build order.*

## State

- **Branch `recovery`** — created from `b4dc2e9` after the process reset;
  `af69099` snapshots the entire pre-reset working tree (legacy Vite site +
  the superseded `web/` Next app) so nothing is lost.
- **Phase A (foundation + homepage) — BUILT, awaiting review.**
  - Repo migrated to Next.js 14 App Router at the **root** (Vite app retired
    from the working tree; fully preserved in git history). TS + Tailwind +
    Framer Motion. SSG; all routes static.
  - `docs/design-tokens.md` transcribed into `app/globals.css` (CSS vars) +
    `tailwind.config.ts` (colours, type scale, radii, easings, durations).
  - Core library in `components/`: `ui.tsx` (Section · Eyebrow · GlassCard ·
    Stat · CTA), `Reveal` (scroll entrance), `.lume` luminous hover,
    `ArchGlyph` (hover-named architecture mark), `TriangleMark`,
    `SiteHeader`/`SiteFooter`, `OrbBackdrop` (persistent faint drifting orb,
    `WaveOrb` port of docs/krim-wave-orb.html).
  - Homepage `/` assembled strictly from `docs/copy/homepage.md` — 8 sections,
    PRESENTATION notes honoured (cyan→mint problem→powers resolution, flywheel
    ring, glass arch glyph, four domain doors with faint motifs, Action
    Receipt + amber refusal, three orbital integration wheels, perimeter
    close). Hero = simple fade (orb-breathe hero is a later work order).
  - Organization JSON-LD; robots.txt (GPTBot/ClaudeBot/PerplexityBot/
    Google-Extended allowed); metadata + canonical.

## Known gaps / pending

- Nav + door routes (`/platform`, `/lending`, …) 404 until their phases ship
  (multi-page IA is in place; pages arrive per build order).
- `/enterprise` + `/msme` doors come from `docs/copy/homepage.md` but are not
  in SITEMAP-IA's sitemap — [CONFIRM] their place in the IA.
- Vercel deploy blocked: no CLI credentials on this machine (`npx vercel login`
  needed once); repo is linked to project `krim-website-clean`.
- "Book a demo" → `mailto:sales@krim.ai` until `/contact` ships.
- Newsletter + socials beyond LinkedIn/X pending; `/blog` feeds pending.

## Next (per SITEMAP-IA build order)

1. ✅ Component system + homepage shell + orb backdrop → **gate (now)**
2. /platform + kendra, kriya, karta, kula, kira
3. The hero, as its own dedicated work order
4. /lending → /epistemic-ai → /contact
5. /government → /trust → /architecture → /research → /services → /company → /blog → 404
6. QA + Lighthouse
