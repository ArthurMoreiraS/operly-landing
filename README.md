# Operly Landing

Operly's public landing page, maintained separately from the SaaS application.

## Product direction

Operly is internationalizing its software. The landing now presents the **Brand & Revenue Operating System for membership-first car wash networks and franchises**, with a **US / English-first** product direction grounded in the sibling `operly-software/docs/strategy/README.md` (reviewed September 5, 2026).

- Preserve the Operly name, logo, dark slate identity, and orange brand accent throughout the redesign.
- Marketing and illustrative product interactions use English. Membership prices in the preview are fictional car wash plans, not Operly subscription prices. Network pricing is discussed through the demo flow.
- The [redesign plan](docs/operly-landing-redesign-plan.md) records the implemented direction, research and remaining validation. The user chose a navigable prototype and explicitly declined further image rounds.
- Roadmap content lives in `src/content/platform.ts`. Future capabilities may be announced; keep availability stages accurate as the product evolves.
- `src/NetworkLanding.tsx`, `src/components/landing/ProductTour.tsx` and `src/landing.css` implement the new page. Existing legal routes remain intact.
- The July 2026 v2 specification and implementation plan are historical. Their Brazil-only positioning, Portuguese copy requirements, BRL assumptions, and earlier layout instructions do not define the new redesign.

## Development

```bash
pnpm install
pnpm dev
```

On Windows PowerShell, use `pnpm.cmd` if execution policy blocks the PowerShell shim. For an isolated local preview: `pnpm.cmd dev --host 127.0.0.1 --port 5173 --strictPort`.

The prototype includes location filtering, membership selection and service expansion, copilot exception details, keyboard-operable module tabs, responsive navigation, FAQ and an on-demand Cal.com embed. Product data is illustrative and does not connect to the SaaS backend.

See [design QA status](design-qa.md) for verification evidence and gaps, and [asset sources](docs/landing-asset-sources.md) for photography provenance.

## Build

```bash
pnpm build
```

## Vercel

- Framework preset: Vite
- Build command: `pnpm build`
- Output directory: `dist`
- Primary domain: `operlyapp.com`
- `www.operlyapp.com` should redirect to the primary domain.

Environment variables:

```env
VITE_APP_URL=https://app.operlyapp.com
VITE_CALCOM_EMBED_LINK=operly-eeqtsh/30min
```
