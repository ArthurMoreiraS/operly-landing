/** Public copy follows operly-software/docs/strategy, reviewed September 5, 2026.
 * Implementation is not evidence of production availability. Keep release status explicit.
 */
export type ModuleStatus =
  "Foundation built" | "In validation" | "On the roadmap";
export const platformModules: {
  id: string;
  name: string;
  short: string;
  description: string;
  status: ModuleStatus;
  detail: string;
}[] = [
  {
    id: "network",
    name: "Network foundation",
    short: "One network. A shared foundation.",
    description:
      "Connect your organization, brands and locations with clear roles and local access.",
    status: "Foundation built",
    detail:
      "A connected view of your locations, customer records and teams, with access tailored to each role. We’ll assess your existing systems and POS compatibility together.",
  },
  {
    id: "memberships",
    name: "Memberships & commerce",
    short: "A membership that travels with the member.",
    description:
      "Bring plan catalogs, benefits and location eligibility into one connected membership layer.",
    status: "In validation",
    detail:
      "Manage plans, benefits and where members can use them. Branded storefronts and membership checkout are being validated; we’ll confirm what you can pilot during your demo.",
  },
  {
    id: "copilots",
    name: "Domain copilots",
    short: "More context. Better decisions.",
    description:
      "Get focused assistance with data imports and membership exceptions, while your team stays in control.",
    status: "In validation",
    detail:
      "Bring imported data into focus and spot membership exceptions that need review. These focused copilots are in validation, with your team reviewing the evidence and deciding the next step.",
  },
  {
    id: "brand",
    name: "Brand Cloud",
    short: "Your standards. At every location.",
    description:
      "A shared home for brand assets, location pages, offers and publishing approvals.",
    status: "On the roadmap",
    detail:
      "Coming next: shared brand kits, approved content and location pages on your own domains. Give local teams room to move while keeping publishing standards consistent.",
  },
  {
    id: "growth",
    name: "Growth & member experience",
    short: "Build the relationship beyond the wash.",
    description:
      "Member self-service, retention journeys and reputation, designed around the same customer context.",
    status: "On the roadmap",
    detail:
      "Coming next: a member portal, plan and payment self-service, retention journeys, SMS and email campaigns, and reputation tools that connect the entire network.",
  },
  {
    id: "intelligence",
    name: "Network intelligence",
    short: "A clearer view of what comes next.",
    description:
      "Comparable performance, network accountability and insight that reaches the right people.",
    status: "On the roadmap",
    detail:
      "Coming next: consistent metrics, location benchmarks, franchise scorecards and follow-up workflows. Broader AI analysis will build on this shared view of network performance.",
  },
];

export const questions = [
  [
    "Who is Operly being built for?",
    "Operly is being built for membership-first car wash brands, multi-location operators and franchise networks. The initial market is the United States, with an English-first experience and an international product architecture.",
  ],
  [
    "Is Operly a replacement for our POS?",
    "The platform is designed to work above your existing POS, rather than replace your wash hardware or point-of-sale system. The data-import foundation is implemented. The first live POS integrations are selected with qualified operators, so we’ll assess your system and rollout requirements together.",
  ],
  [
    "Which capabilities can we explore today?",
    "The network foundation, customer data, membership catalog, benefits and entitlements are implemented. Branded membership checkout and focused copilots are in validation. Brand Cloud, full member self-service, lifecycle marketing and advanced network intelligence are on the roadmap. Your demo will distinguish what can be piloted from what is planned.",
  ],
  [
    "Can corporate and franchise locations share the platform?",
    "The network foundation models organizations, brands, markets and locations. Scoped roles are designed to give central teams a network view while restricting each local operator to the locations and actions they are authorized to access.",
  ],
  [
    "How does AI fit into the product?",
    "Focused copilots help your team review data imports and membership exceptions, showing the context behind each suggestion. Your team stays in control of the decision. Broader marketing, support and analyst agents are planned for later stages.",
  ],
  [
    "How is pricing structured?",
    "Pricing will reflect your network size, selected modules and rollout needs. Book a conversation to discuss your locations, current systems and priorities, and we’ll work through the right scope together.",
  ],
];
