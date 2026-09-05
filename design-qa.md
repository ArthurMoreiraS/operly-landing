# Operly redesign QA

Date: September 5, 2026

final result: passed

Scope: local navigable landing prototype. This is not a production-release approval.

## Follow-up: automated wash photography

After approving the page, the user clarified that the target is automated car wash operators. Replaced only the second photograph with a real automatic gantry wash, updated its dimensions / alt text and centered the crop. Kept the section composition, brand treatment and motion intact. The original image is retained locally for reversibility.

The updated source image and rendered crops were opened and reviewed. Playwright confirmed image decoding at 1440px, 390px and 320px; captures are `.qa/automatic-section-1440.png`, `.qa/automatic-section-390.png` and `.qa/automatic-section-320.png`. The production build passed again after the replacement. The development preview was restarted as a hidden background process after the prior session ended.

## Brief and review method

The user explicitly chose a navigable prototype without another image round after rejecting the first concept. The source brief is the updated network product strategy, the original logo / brand colors and the agreed English-first direction. The rejected image is not a fidelity target; no claim of pixel matching is made.

Browser inventory initially returned no apps or browsers. The user explicitly authorized Playwright as an alternative. Review used Playwright 1.63 with a fresh headless Microsoft Edge context, without accessing the user's browser profile. Both Vite development and the production preview were exercised.

Opened full-page and focused captures at desktop and mobile sizes. Reviewed heading / body typography, composition, photography, modules, product examples, FAQ and calendar states. Image assets were inspected separately before placement. The review compares implementation to the written brief and source brand assets, not to an unapproved mockup.

## Findings and fixes

- The first build identified an unsupported Manrope import path. Replaced it with the package entry point; subsequent TypeScript, client, SSR and prerender builds passed.
- The reused accordion inherited light text on a light surface. Corrected the content foreground; opened-FAQ captures confirm readable text.
- Initial desktop hero capture showed an abrupt edge at the photograph boundary. Extended the opaque section of the scrim to meet the image edge; revised desktop and tablet captures show a continuous transition.
- Module details were too small and too implementation-oriented. Increased desktop detail text to 12px and revised the copy around operator benefits while retaining development stages.
- An initial full-page capture omitted the lazy workshop image because the viewport had not reached it. The QA script now scrolls to it and waits for image decoding before full-page capture. This was a capture issue, not a missing site asset.

No unresolved P0/P1/P2 issue found within the new local landing surface in the final review. Existing external / legal content is addressed separately below.

## Final technical and interaction evidence

`pnpm.cmd build` passed: TypeScript, Vite client, Vite SSR and static prerendering for `/`, `/termos`, `/privacidade`. Production browser tests therefore cover hydration of the rendered HTML, not just the development app.

| Viewport | Horizontal document width | Heading/control clipping |
|---|---|---|
| 1440 × 1000 | 1440px | None detected |
| 768 × 1024 | 768px | None detected |
| 390 × 844 | 390px | None detected |
| 320 × 760 | 320px | None detected |

Automated interaction checks passed at 1440px and 390px:

- Location filter changes visible rows and member totals; reset restores 1,144 example members.
- Membership selection changes the plan and included services.
- Copilot exception details open and close.
- Roadmap selection and keyboard End navigation update the selected tab / panel.
- FAQ opens and closes.
- Calendar appears, loads its iframe and closes.
- Mobile menu appears and Escape dismisses it.
- Motion-enabled desktop scrolling selects all three walkthrough stages.
- Reduced-motion contexts keep content visible.

Final production run: zero browser console errors, zero page runtime errors and zero failed network requests. Earlier aborted calendar requests occurred during immediate iframe dismissal; the final review waited for the calendar before closing.

## Visual surfaces

| Surface | Assessment |
|---|---|
| Typography | Manrope headings and Inter preview text load locally. Desktop scale and mobile wrapping reviewed. At 320px the hero intentionally wraps onto three lines. |
| Layout | Wide desktop grid, dark interactive preview, photographic split, list-based roadmap and stacked mobile layout. Four responsive widths checked. |
| Color | Original slate and orange remain dominant; warm paper separates longer reading sections. Selected states and FAQ foreground reviewed. |
| Photography | Original local images render clearly. Hero transition corrected; workshop crop and caption inspected. Stock imagery is illustrative, not customer evidence. |
| Copy | English-first brand / revenue positioning, fictional examples, current development stages and future modules reflect the sibling strategy. American spelling is used in the new copy. |

## Evidence files

Local QA artifacts are retained in the ignored `.qa/` directory:

- `report.json` — production interaction and viewport results.
- `check.mjs`, `review.mjs` — temporary browser review scripts.
- `hero-1440.png`, `hero-768.png`, `hero-390.png`, `hero-320.png`.
- `page-1440.png`, `page-768.png`, `page-390.png`, `page-320.png`.
- `membership-1440.png`, `membership-390.png`, `tour-motion.png`.
- `network-1440.png`, `roadmap-1440.png`, `faq-1440.png` and mobile counterparts.
- `calendar-1440.png`, `calendar-390.png`.

Long element captures can include fixed browser-page layers during Playwright's automatic scrolling; use viewport and full-page captures together when judging those artifacts.

## Public-release follow-up

- The existing Cal.com event loads and shows available times, but retains Portuguese event content. The booking was not submitted. Update the event in Cal.com for an English-first public launch; an experimental locale query did not change this content and was removed.
- Existing Portuguese legal pages and inherited social-sharing graphic remain intact and need internationalization review before release.
- Product examples are frontend simulations; no SaaS backend or actual payment behavior was tested.
- Safari, Firefox, physical devices, a full accessibility audit and measured performance profiling are outside this prototype validation.
- Small utility labels can be enlarged further as a polish choice; primary controls and content were reviewed at the tested widths.

The preview is local. No deployment, booking, payment or external message was performed.
