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
    tagline: "A food ordering concept focused on speed, clarity, and delight.",
    description: "A food ordering and discovery concept focused on speed and clarity.",
    tags: ["Food", "Web"],
    year: "2023",
    role: "Product Designer",
    platform: "iOS · Android",
    videoSrc: "/videos/foodcourt.MP4",
    problem:
      "Food delivery apps in Lagos suffer from information overload. Menus are cluttered, lead times are opaque, and re-ordering a favourite meal takes too many taps. Foodcourt needed a redesign that reduced cognitive load while increasing repeat-order frequency.",
    processSteps: [
      {
        step: "01",
        title: "Heuristic Audit",
        body: "Evaluated the legacy interface against Nielsen's 10 heuristics and mapped 22 usability violations. Grouped findings into three severity tiers and presented a prioritised fix list to the product team.",
      },
      {
        step: "02",
        title: "Competitive Analysis",
        body: "Benchmarked Chowdeck, Jumia Food, and Glovo across 8 UX dimensions. Identified a whitespace opportunity in persistent re-order flows and real-time kitchen status updates.",
      },
      {
        step: "03",
        title: "Prototyping",
        body: "Built three interactive Figma prototypes — minimal, standard, and rich — and ran moderated usability tests with 15 participants. The rich prototype won on satisfaction but the minimal prototype had the fastest task completion.",
      },
      {
        step: "04",
        title: "Iteration",
        body: "Merged the two winning approaches: a clean visual hierarchy from the minimal prototype with the contextual re-order and status features from the rich version. Final design reduced average order flow from 11 taps to 6.",
      },
    ],
    aiWorkflow: {
      headline: "AI-powered menu taxonomy and copy generation",
      tools: [
        { name: "Claude", role: "Menu category restructuring and microcopy generation" },
        { name: "Galileo AI", role: "Initial wireframe generation from prompt briefs" },
        { name: "Runway", role: "Motion exploration for food card transitions" },
      ],
      summary:
        "Used Claude to reclassify 600+ menu items into a new 12-category taxonomy in under an hour — a task that would have taken a content team two days. Galileo AI produced 30 wireframe starting points from briefs, cutting ideation from days to hours.",
    },
    impactStats: [
      { value: "11→6", label: "Taps to Complete Order" },
      { value: "+27%", label: "Repeat Order Rate" },
      { value: "4.6★", label: "Post-launch App Rating" },
      { value: "−41%", label: "Cart Abandonment" },
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
