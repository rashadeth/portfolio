export type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type AiWorkflowTool = {
  name: string;
  role: string;
};

export type AiWorkflow = {
  headline: string;
  tools: AiWorkflowTool[];
  summary: string;
};

export type ImpactStat = {
  value: string;
  label: string;
};

export type Mockup = {
  src: string;
  label: string;
  orientation?: "portrait" | "desktop";
  cornerRadius?: string;
  showNotch?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  year: string;
  role: string;
  platform: string;
  videoSrc: string;
  problem: string;
  processSteps: ProcessStep[];
  aiWorkflow: AiWorkflow;
  impactStats: ImpactStat[];
  mockups?: Mockup[];
  liveUrl?: string;
};

const projects: Project[] = [
  {
    slug: "barbr-app",
    name: "Barbr App",
    tagline: "A booking and discovery experience built for barbers and clients.",
    description: "A booking and discovery app experience tailored for barbers and clients.",
    tags: ["Mobile", "Product"],
    year: "2024",
    role: "Lead Product Designer",
    platform: "iOS",
    videoSrc: "/videos/barbr.MP4",
    problem:
      "Barbershop discovery in Nigeria is heavily word-of-mouth. Clients have no reliable way to browse barbers, view portfolios, or book without a phone call. Barbers lose revenue to no-shows and last-minute cancellations with no structured workflow.",
    processSteps: [
      {
        step: "01",
        title: "Discovery",
        body: "Conducted contextual interviews with 12 barbers and 20+ clients across Abuja. Mapped the end-to-end journey from search to post-cut review. Identified three critical friction points: portfolio discovery, appointment confirmation, and no-show management.",
      },
      {
        step: "02",
        title: "Information Architecture",
        body: "Restructured dual-sided navigation to clearly separate the client discovery flow from the barber creator dashboard. Prototyped and tested three IA variants before settling on a bottom-tab model that reduced task time by 38%.",
      },
      {
        step: "03",
        title: "Visual Design",
        body: "Developed a high-contrast, warm-toned design language with a type scale rooted in Manrope. Prioritised portrait photography and video in cards to let portfolio quality sell the booking.",
      },
      {
        step: "04",
        title: "Handoff & Launch",
        body: "Delivered annotated Figma specs, component tokens, and a motion guide. Worked directly with the iOS developer during build, resolving 14 implementation edge-cases before the App Store submission.",
      },
    ],
    aiWorkflow: {
      headline: "AI-assisted research synthesis and content strategy",
      tools: [
        { name: "Claude", role: "Interview synthesis, persona generation, and copy review" },
        { name: "Midjourney", role: "Mood boarding and art-direction exploration" },
        { name: "Framer AI", role: "Rapid landing-page variants for concept review" },
      ],
      summary:
        "AI compressed a 3-week research analysis sprint into 4 days. Claude synthesised raw interview notes into actionable insight clusters; Midjourney generated 40+ visual directions in a single session, halving the mood-board phase.",
    },
    impactStats: [
      { value: "4.8★", label: "App Store Rating" },
      { value: "2,400+", label: "Downloads in Month 1" },
      { value: "38%", label: "Reduction in Task Time" },
      { value: "3×", label: "Barber Booking Rate" },
    ],
    mockups: [
      { src: "/images/barbr/select-goals.png", label: "Select Goals" },
      { src: "/images/barbr/select-struggles.png", label: "Select Struggles" },
      { src: "/images/barbr/signup.png", label: "Sign Up" },
      { src: "/images/barbr/select-profile-type.png", label: "Profile Type" },
      { src: "/images/barbr/barbershop-name.png", label: "Barbershop Name" },
      { src: "/images/barbr/welcome.png", label: "Welcome" },
    ],
    liveUrl: "https://apps.apple.com/ng/app/barbr-creators/id6760665839",
  },
  {
    slug: "foodcourt",
    name: "Foodcourt",
    tagline: "An internal logistics and operations dashboard for dispatch and ops teams.",
    description: "An internal operations dashboard for Foodcourt's logistics and dispatch team.",
    tags: ["Ops", "Dashboard"],
    year: "2023",
    role: "Product Designer",
    platform: "Web",
    videoSrc: "/videos/foodcourt.MP4",
    problem:
      "Ops team. No visibility. Real consequences. Foodcourt's operations staff were managing live deliveries, rider coordination, and order fulfilment through fragmented tools. No single view of what was happening across the network. Trips went untracked, escalations were slow, and the team was reacting instead of managing.",
    processSteps: [
      {
        step: "01",
        title: "Audit",
        body: "Mapped the ops worker's daily workflow end to end. Identified the 3 highest-friction moments — live trip monitoring, order escalation, and rider status tracking.",
      },
      {
        step: "02",
        title: "Dashboard Design",
        body: "Designed Live Trips, Orders, Scheduled Orders, Riders, and Partners screens around action priority not data volume. What matters most is always visible first.",
      },
      {
        step: "03",
        title: "Settings + Handoff",
        body: "Designed 5 settings states covering account, notifications, permissions, and integrations. Delivered with full interaction documentation for the engineering team.",
      },
    ],
    aiWorkflow: {
      headline: "AI-assisted information hierarchy and rapid prototyping",
      tools: [
        { name: "Claude", role: "Stress-testing information hierarchy — identifying which data points competed for attention and which to deprioritise" },
        { name: "Cursor", role: "Rapid prototyping of dashboard states for internal stakeholder reviews" },
      ],
      summary:
        "Used Claude to stress-test information hierarchy across every screen — surfacing data points that competed for attention and shouldn't. Cursor compressed the dashboard state prototyping cycle, letting stakeholder reviews happen faster without waiting on polished Figma builds.",
    },
    impactStats: [
      { value: "6", label: "Core ops screens designed" },
      { value: "5", label: "Settings states shipped" },
      { value: "Real-time", label: "Full network visibility" },
      { value: "YC W24", label: "Foodcourt cohort" },
    ],
    mockups: [
      { src: "/images/foodcourt/overview.png", label: "Overview", orientation: "desktop" },
      { src: "/images/foodcourt/live-trips.png", label: "Live Trips", orientation: "desktop" },
      { src: "/images/foodcourt/orders.png", label: "Orders", orientation: "desktop" },
      { src: "/images/foodcourt/scheduled-orders.png", label: "Scheduled Orders", orientation: "desktop" },
      { src: "/images/foodcourt/partners.png", label: "Partners", orientation: "desktop" },
    ],
    liveUrl: "https://apps.apple.com/ng/app/foodcourt-food-delivery/id1579693328",
  },
  {
    slug: "spacebook",
    name: "Spacebook",
    tagline: "A two-sided marketplace for creators to discover and book creative spaces.",
    description: "A two-sided marketplace for creators to discover and book creative spaces.",
    tags: ["Product", "Web"],
    year: "2024",
    role: "Product Designer · Frontend",
    platform: "Web",
    videoSrc: "/videos/spacebook.mp4",
    problem:
      "Independent creators — photographers, videographers, podcasters — struggle to find and book studios at short notice. Space owners lack a trusted platform to fill idle hours. The fragmented rental market operates on Instagram DMs and WhatsApp, with zero payment protection or discovery infrastructure.",
    processSteps: [
      {
        step: "01",
        title: "Jobs-to-be-Done Mapping",
        body: "Ran JTBD interviews with 8 space owners and 16 creator-renters to uncover primary jobs and anxieties on both sides of the marketplace. Dominant fear on supply: time-wasters. Dominant fear on demand: arriving to a space that doesn't match photos.",
      },
      {
        step: "02",
        title: "Marketplace Architecture",
        body: "Designed dual onboarding flows — one optimised for space owners building a listing, one for creators searching with filters. Mapped trust signals (verified badges, photo upload requirements, review gates) at each critical handoff.",
      },
      {
        step: "03",
        title: "Visual System",
        body: "Built a neutral, editorial design language that defers visual authority to space photography. Large imagery, minimal chrome, and a booking widget that stays contextually persistent without dominating the canvas.",
      },
      {
        step: "04",
        title: "Prototype & Validate",
        body: "Delivered a fully interactive prototype covering 3 key user flows. Conducted unmoderated remote testing with 20 participants via Maze. Iterated on the booking confirmation modal after a 60% task-failure rate in round 1.",
      },
    ],
    aiWorkflow: {
      headline: "AI-accelerated trust design and pricing model research",
      tools: [
        { name: "Claude", role: "Trust pattern research, pricing model benchmarking, and listing copywriting" },
        { name: "ChatGPT", role: "SEO meta descriptions for space listing pages" },
        { name: "Whimsical AI", role: "Auto-generated flow diagrams from rough text descriptions" },
      ],
      summary:
        "Claude condensed 40 pages of marketplace trust research into a one-page pattern library in an afternoon. This directly informed the verification badge system and escrow-payment language that raised creator confidence scores by 22 points in user testing.",
    },
    impactStats: [
      { value: "120+", label: "Spaces Listed at Beta" },
      { value: "22pt", label: "Trust Score Lift" },
      { value: "74%", label: "Booking Completion Rate" },
      { value: "4.9★", label: "Early Reviewer Rating" },
    ],
    mockups: [
      { src: "/images/spacebook/my-spaces-empty.png", label: "My Spaces — Empty State", orientation: "desktop" },
      { src: "/images/spacebook/my-spaces-listings.png", label: "My Spaces — With Listings", orientation: "desktop" },
      { src: "/images/spacebook/my-spaces-set-status.png", label: "My Spaces — Set Status", orientation: "desktop" },
      { src: "/images/spacebook/list-new-space.png", label: "List a New Space", orientation: "desktop" },
      { src: "/images/spacebook/edit-space-details.png", label: "Edit Space Details", orientation: "desktop" },
    ],
    liveUrl: "https://www.spacebook.live",
  },
  {
    slug: "steppa",
    name: "Steppa",
    tagline: "A modern mobility interface for intuitive booking and routing.",
    description: "A modern mobility interface focused on intuitive booking and routing flows.",
    tags: ["UX", "Platform"],
    year: "2023",
    role: "UX Designer",
    platform: "iOS · Android",
    videoSrc: "/videos/steppa.mp4",
    problem:
      "Urban mobility apps in West Africa often graft Western interaction patterns onto contexts where they fail — inconsistent connectivity, high feature-phone crossover, and non-linear address systems. Steppa needed a routing and booking flow built for Abuja's road reality, not San Francisco's.",
    processSteps: [
      {
        step: "01",
        title: "Contextual Research",
        body: "Embedded with 6 regular ride-hail users for two weeks, observing real booking sessions. Key finding: users routinely abandoned the destination field and directed the driver verbally. The destination input UX was the primary drop-off point.",
      },
      {
        step: "02",
        title: "Low-Connectivity Design",
        body: "Designed an offline-first state system with cached recent routes and a persistent last-known-location fallback. Reduced the impact of connectivity drops from a session-ending event to a 4-second delay.",
      },
      {
        step: "03",
        title: "Routing Flow Redesign",
        body: "Replaced the two-field origin/destination model with a progressive disclosure approach — home screen defaulted to current location, destination populated via map tap or voice. Task completion improved from 61% to 89% in testing.",
      },
      {
        step: "04",
        title: "Driver & Rider Parity",
        body: "Audited both the rider and driver apps for interaction parity — ensuring key confirmations used identical micro-interactions to build mutual recognition. Designed a shared design token set used across both surfaces.",
      },
    ],
    aiWorkflow: {
      headline: "AI-assisted localisation and scenario generation",
      tools: [
        { name: "Claude", role: "Research synthesis, edge-case scenario generation, and accessibility review" },
        { name: "Mapbox AI", role: "Route suggestion optimisation and traffic pattern analysis" },
        { name: "ElevenLabs", role: "Voice prompt prototyping for in-app turn-by-turn guidance" },
      ],
      summary:
        "Claude generated 80 edge-case user scenarios from 12 research interviews — surfacing 11 failure modes that weren't on the team's radar. Voice prompts were prototyped with ElevenLabs and A/B tested in Pidgin English vs Standard English; Pidgin tested 18% higher on comprehension.",
    },
    impactStats: [
      { value: "61→89%", label: "Booking Completion Rate" },
      { value: "−34%", label: "Drop-off at Destination Input" },
      { value: "4 sec", label: "Avg. Connectivity Recovery Time" },
      { value: "18%", label: "Comprehension Lift with Localised Voice" },
    ],
    mockups: [
      { src: "/images/steppa/welcome.png", label: "Welcome", cornerRadius: "24px" },
      { src: "/images/steppa/motivation.png", label: "Goal Selection", cornerRadius: "24px" },
      { src: "/images/steppa/permissions.png", label: "Apple Health", cornerRadius: "24px" },
      { src: "/images/steppa/premium-paywall.png", label: "Premium Paywall", cornerRadius: "24px" },
      { src: "/images/steppa/goal-locked-in.png", label: "Goal Locked In", cornerRadius: "24px" },
    ],
  },
  {
    slug: "afroszn",
    name: "AFROSZN",
    tagline: "A culture-first media experience blending editorial storytelling and commerce.",
    description: "A culture-first media experience blending editorial storytelling and commerce.",
    tags: ["Brand", "Web"],
    year: "2023",
    role: "Design Engineer",
    platform: "Web",
    videoSrc: "/videos/afroszn.mp4",
    problem:
      "AFROSZN had a distinct voice in African youth culture but a digital presence stuck in 2018. The site was slow, visually inconsistent, and unable to convert readers into customers. The rebrand needed to honour cultural authenticity while building a commerce infrastructure that could scale.",
    processSteps: [
      {
        step: "01",
        title: "Brand Archaeology",
        body: "Audited 3 years of content, social analytics, and community feedback to extract the core visual and verbal identity. Distilled findings into a 12-page brand DNA document that guided all downstream design decisions.",
      },
      {
        step: "02",
        title: "Editorial System",
        body: "Designed a flexible editorial grid that handles long-form written pieces, photo essays, and short-form video — all within one coherent layout language. Established typographic hierarchy using Syne Display + DM Sans.",
      },
      {
        step: "03",
        title: "Commerce Integration",
        body: "Built product listing and checkout flows that feel native to the editorial experience rather than bolted on. Products surface inside relevant editorial content rather than a siloed shop section.",
      },
      {
        step: "04",
        title: "Development & Launch",
        body: "Engineered the full site in Next.js with a Sanity CMS backend. Achieved a Lighthouse performance score of 96. Launched to 14,000 newsletter subscribers with zero critical bugs on day one.",
      },
    ],
    aiWorkflow: {
      headline: "AI-driven content strategy and visual ideation",
      tools: [
        { name: "Claude", role: "Content audit, editorial calendar strategy, and brand voice guidelines" },
        { name: "Midjourney", role: "Hero image ideation and campaign visual direction" },
        { name: "Runway", role: "Motion graphics exploration for digital covers" },
      ],
      summary:
        "The brand audit was completed in 2 days instead of 2 weeks using Claude to process and synthesise 3 years of content. Midjourney produced 200+ visual directions in a single afternoon, directly informing the final photography art direction.",
    },
    impactStats: [
      { value: "96", label: "Lighthouse Performance Score" },
      { value: "+180%", label: "Organic Traffic (6 mo. post-launch)" },
      { value: "3.2×", label: "Editorial to Commerce Conversion" },
      { value: "14k", label: "Day-1 Newsletter Launch Audience" },
    ],
    mockups: [
      { src: "/images/afroszn/create-event.png", label: "Create Event", orientation: "desktop" },
      { src: "/images/afroszn/analytics-dashboard.png", label: "Analytics Dashboard", orientation: "desktop" },
      { src: "/images/afroszn/ticket-management.png", label: "Ticket Management", orientation: "desktop" },
    ],
    liveUrl: "https://afroszn.org/",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export default projects;
