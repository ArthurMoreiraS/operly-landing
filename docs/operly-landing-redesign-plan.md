# Operly landing redesign

Updated September 5, 2026. Status: navigable prototype implemented and verified in development and production previews with Playwright. See `design-qa.md` for evidence and release follow-up.

## Decision and positioning

The user rejected the first image direction and chose a working prototype with real interaction, without another image round. The brand name, symbol, slate `#222A34` and orange `#DE7954` stay central. International / English marketing is authorized, including announcements of future features.

Reading `../operly-software/docs/strategy/README.md` changed the positioning substantially: Operly is a **Brand & Revenue Operating System for membership-first car wash networks**, US / English-first, with corporate and franchise locations. It is designed as a layer above existing POS systems. The earlier individual-shop scheduling / WhatsApp proposal is superseded.

The landing must describe a platform that can expand from network and membership foundations to commerce, brand governance, member experience, franchise control and intelligence. It must not require a full redesign whenever a module ships.

## Source of truth

Reviewed the sibling repository's strategy index, product reset, feature matrix, execution plan, phase-one progress, AI roadmap, storefront milestone, product overview and navigation/routes. The strategy index explicitly supersedes earlier product descriptions. No sibling software files were modified.

| Area | Evidence from the software | Treatment in the landing |
|---|---|---|
| Network | Organisation, brand, market, location; scoped roles and rollups | Core platform story and interactive location example |
| Customer/data foundation | Identity, consent, CSV imports, provider-neutral connector runtime | Connected customer context; discuss POS compatibility per network |
| Memberships | Catalog, benefits, contracts, entitlements and cross-location eligibility implemented | Interactive plans, services and location access |
| Commerce | Branded storefront and Stripe Connect membership checkout implemented; end-to-end validation pending | Announced with validation status |
| Copilots | Data and Membership Copilots, deterministic fallback and optional AI | Illustrative, read-only exception review |
| Brand Cloud | Versioned kits, approvals, pages, domains and rollback planned | Roadmap module |
| Member experience and growth | Portal, dunning, retention, lifecycle SMS/email, reputation planned | Roadmap module |
| Franchise and intelligence | Scorecards, audits, governed metrics, benchmarks, analysis planned | Roadmap module |
| Broader AI agents | Analyst, CMO and support agents follow the platform foundations | Future direction; no autonomous production claim |
| Commercial offer | Network platform / per-location / module packaging remains in discovery | Contact-based pricing, no inherited single-location price |

Implementation in the software is not proof of production availability. Confirm rollout and integration availability during the demo. Announcing future modules does not require fabricated release dates, customer results, testimonials or universal POS compatibility.

## Reference research

| Official reference | Design lesson adopted |
|---|---|
| [Linear](https://linear.app/) | Product-led narrative, progressive explanation and deliberate hierarchy |
| [Attio](https://attio.com/) | Dense, meaningful product examples that visitors can understand in context |
| [Jobber](https://www.getjobber.com/) | Industry-specific language and real operational photography |
| [Fresha](https://www.fresha.com/for-business) | Connect operator capabilities with the customer relationship |
| [Nautilus](https://www.nautilus.co/) | Breadth of the car wash platform story across selling, managing, marketing and measurement |

Research used web search and official pages. Direct Google browser capture was unavailable. These are references for decisions, not proof that a particular design increases conversion. Do not borrow vendor metrics, customer logos or quotes.

## Implemented direction

An editorial site with strong scale, real automotive photography and a mix of dark slate and warm paper surfaces. Manrope Variable gives headings their own character; the original symbol and brand accents preserve recognition. Wide layouts, fine dividers, square-cut controls and full-width photographic sections replace the repeated rounded-card composition.

The hero leads with **One brand. Every location.** The broader promise is a connected brand and revenue platform. Photography supplies industry context; the product demonstration explains the platform.

After reviewing the working prototype, the user approved the overall design and clarified that the target operators run automated washes with machines surrounding the vehicle. The second image was therefore replaced with a real automatic gantry wash. Future image choices should make that operational context explicit, rather than emphasize employees washing cars by hand.

Page sequence:

1. Brand and platform promise; demo CTA and platform anchor.
2. Network, membership and copilot walkthrough, with sticky desktop presentation and usable mobile tabs.
3. Brand consistency and appropriate access across locations.
4. Expandable platform roadmap with content and stage maintained separately from layout.
5. Commercial conversation tailored to network, systems and modules.
6. Practical FAQ about positioning, POS, current stage, franchise access, AI and pricing.
7. Demo scheduling and footer.

## Technology and interactions

Retain React 19, Vite, TypeScript, Tailwind and existing routing / static prerendering. GSAP with ScrollTrigger coordinates headline entrance, restrained photographic parallax, reading progress and the product walkthrough. See [GSAP React guidance](https://gsap.com/resources/React/).

Use native scrolling, responsive CSS and a reduced-motion branch. No WebGL or 3D is needed for this narrative: the technology should make the actual platform easier to explore. The local, functional product preview is the principal interactive asset.

- Network: all-location and individual-location filters; consistent member totals.
- Memberships: three fictional car wash plans; select plan and expand services.
- Copilots: open and close read-only example exceptions.
- Modules: click and keyboard navigation, selected state, status and detail.
- Navigation: section anchors, mobile menu, Escape dismissal and sign-in link.
- Conversion: load the existing calendar on demand with loading, close and fallback states.
- FAQ: accessible accordion.
- Motion: scoped GSAP cleanup, reduced-motion support and layout refresh.

The example business, members, plans and exceptions are fictional. No SaaS backend connection, checkout transaction or real message sending is part of the prototype.

## Maintainability and release path

- Update module content in `src/content/platform.ts` as development progresses.
- Keep example interactions in `ProductTour.tsx`; replace or extend them when better production demonstrations become available.
- Preserve lazy calendar loading and static prerendering.
- Update module availability separately from the visual architecture.
- Add genuine operator evidence only with approved material.
- Existing Portuguese legal pages and the old social-sharing image require a separate internationalization review before a public release. Their content was preserved.
- Confirm the external booking event's public copy, availability and timezone presentation before launch.

## Validation

Production build includes TypeScript, Vite client, Vite SSR and static HTML for all three existing routes. See `design-qa.md` for current checks.

Browser verification covered 1440px desktop, 768px tablet, 390px and 320px mobile; full-page layout and photo crops; primary preview controls; keyboard tabs; reduced motion; demo loading; and console errors. No horizontal overflow or browser errors were detected in the final production run. The external calendar's Portuguese event copy remains a public-release follow-up.

No deployment, domain change or production publication is part of this local prototype task.
