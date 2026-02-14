export const profileData = {
  name: "Kushal",
  tagline: "Software Engineer",
  bio: "I design and build software that solves real problems — from smart agriculture IoT dashboards to live sports scoreboards. I care deeply about clean code, thoughtful UX, and shipping products that people actually want to use.",
  github: "https://github.com/KushalM23",
  linkedin: "https://www.linkedin.com/in/kushalm2301/",
  email: "kushalm2301@gmail.com",
};

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  architecture: string;
  features: string[];
  techStack: string[];
  previewImage?: string;
  github: string;
  live?: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Scoard",
    description: "Real-time NBA scoreboard with live game tracking, virtual court visualization, and play-by-play feeds. Built with Next.js for ultra-low latency game state updates using Server-Sent Events (SSE).",
    longDescription: "Scoard is a high-performance, real-time sports scoreboard application designed to simulate the experience of watching basketball games without actually watching. It replaces manual score-checking with a digital platform that updates instantly as games progress, featuring intelligent play-by-play visualization, smart game alerts, and comprehensive team statistics.\n\nThe application connects directly to the NBA's official CDN and Stats API (no authentication required) to fetch live game data. Using Server-Sent Events (SSE), the frontend maintains persistent connections to game streams, enabling broadcast-like updates without polling latency.\n\nKey Technical Challenge: Handling real-time data from potentially 15+ concurrent NBA games without overwhelming the client. Solution: Implemented per-game SSE pollers on the backend with automatic polling cessation once games finish.",
    architecture: "SSE Implementation: Per-game server-side pollers that maintain live connections, broadcasting game state changes as SSE events. Intelligent Fallback: NBA CDN as primary source, Stats API fallback if CDN is delayed. Play-by-Play Queue System: Sequential event playback for broadcast-like visualization. Zero-Auth API: Direct access to official NBA data sources eliminates backend complexity. Performance: Sub-second updates for live game state, automatic connection cleanup after game completion.",
    features: [
      "Live Scoreboard with real-time scores, game clock, quarter info, and team records via SSE",
      "Virtual Court Visualization with shot mapping, offensive/defensive rebounds, and free throws",
      "Smart Notifications for points, rebounds, assists, steals, and blocks",
      "Game Schedule browser with date picker and League Standings with conference rankings",
      "Dark glassmorphism UI with Framer Motion animations, fully responsive"
    ],
    techStack: ["TypeScript", "Next.js 15", "React 19", "Tailwind CSS", "Framer Motion", "SSE", "NBA API"],
    github: "https://github.com/KushalM23/Scoard",
    live: "https://scoard.onrender.com",
  },
  {
    id: 2,
    title: "SmartAgriNode",
    description: "Comprehensive IoT agriculture platform combining machine learning, hardware integration, and real-time dashboarding. Delivers AI-powered crop recommendations and weed detection for precision farming.",
    longDescription: "SmartAgriNode is a full-stack agricultural technology platform designed to modernize farming through automation and AI. It integrates soil sensors, computer vision, and machine learning to help farmers make data-driven decisions about crop selection, irrigation, and pest management.\n\nThe system operates across three layers: Hardware (ESP32 sensors + ESP32-CAM for 360° field scanning), Backend (FastAPI + YOLOv8 ML pipeline), and Frontend (React dashboard with live metrics). Farmers authenticate via Supabase, receive personalized crop recommendations based on soil and climate data, and get real-time weed detection alerts from drone/camera footage.\n\nKey Engineering Challenge: Command-driven hardware communication with a stateless backend. Solution: Implemented a global command queue system where the backend sets commands that ESP32 devices poll every few seconds, decoupling request/response timing from physical sensor limitations.",
    architecture: "Command-Polling Architecture: Asynchronous flow eliminates direct hardware-backend coupling. Frontend requests sensor data → Backend queues command → ESP32 polls /api/device/check-command every 3-5 seconds → Executes command → Sends data via /api/device/update-sensors → Frontend polls for results. 360° Weed Scanning: Stepper motor rotates 45° increments, capturing 8 images per scan. YOLOv8 model converted to ONNX for faster inference. Supabase provides single source of truth for user data, auth, and historical records.",
    features: [
      "AI Crop Recommendation Engine based on soil NPK, temperature, humidity, pH, and rainfall",
      "YOLOv8 Weed Detection optimized with ONNX Runtime for real-time identification",
      "Real-Time Dashboard with live soil metrics and climate data via OpenMeteo API",
      "ESP32 Hardware Integration with 360° automated field scanning via stepper motor",
      "User Authentication via Supabase with recommendation and detection history tracking"
    ],
    techStack: ["React", "TypeScript", "FastAPI", "YOLOv8", "Supabase", "ESP32", "ONNX Runtime"],
    github: "https://github.com/KushalM23/SmartAgriNode",
    live: "https://smart-agri-node.vercel.app",
  },
  {
    id: 3,
    title: "NextTern",
    description: "Two-sided talent marketplace for internships built on the principle that \"discovery beats paperwork.\" Students build identity once and get discovered; recruiters post clear opportunities and close feedback loops.",
    longDescription: "NextTern reimagines the internship recruitment process by eliminating forms, resumes, and ghosting. The platform is built around the core belief that people should be reviewed as humans, not as documents.\n\nFor Students: Build a professional identity once (structured ProfileCards with projects, skills, links, proof of work), then explore internship opportunities through intuitive card-based discovery. Always know application status—no silence, no guessing.\n\nFor Recruiters: Post internship cards with clear expectations and outcomes, discover talent through proof-weighted matching (GitHub repos, projects, contributions carry more weight than claim-based resumes), manage candidates through explicit pipeline stages.\n\nKey Technical Challenge: Maintaining state consistency across Web (React + Vite), Mobile (React Native + Expo), and Backend (Node + Express) with shared TypeScript types. Solution: Developed a shared/ package for unified type definitions across all platforms.",
    architecture: "Monorepo Structure: Web app (app/), Mobile (mobile/), Backend (server/), Shared Types (shared/). Shared Type System: /shared package imported by all three platforms ensures type safety and consistency. Passwordless Magic Links for auth with improved UX and security. WebSocket Chat for real-time messaging. Prisma ORM for type-safe database queries with automatic migrations. Progressive Disclosure: Card UX reveals information gradually for less cognitive load.",
    features: [
      "ProfileCard System for structured professional identity building with proof-of-work",
      "Card-Based Discovery with swipe-based exploration for low-friction talent matching",
      "Real-Time WebSocket Chat between students and recruiters",
      "Passwordless Magic Link Authentication for improved security and UX",
      "Cross-Platform unified experience on Web, iOS, and Android via shared TypeScript types"
    ],
    techStack: ["React", "React Native", "Expo", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "WebSocket"],
    github: "https://github.com/reyyanxjanbaz/NextTern",
  },
  {
    id: 4,
    title: "Kasparro",
    description: "High-fidelity audit platform for the \"neural-web epoch.\" Delivers AI-readiness metrics across 7 audit modules with a data-driven dashboard for multi-brand management.",
    longDescription: "Kasparro is a sophisticated product dashboard that demonstrates advanced frontend architecture principles. It materializes a vision of SEO for an AI-first future where traditional keyword rankings matter less than visibility within AI-powered search engines (ChatGPT, Gemini, Perplexity).\n\nThe platform divides functionality into two surfaces: a Public Website (Marketing Layer) explaining Kasparro's vision, and a Product Dashboard (Application Layer) with high-level brand snapshots, deep-dive audit module details, and system architecture visualization.\n\nAll data flows through a structured, type-safe system with multi-brand support and persistent brand selection managed via Zustand stores.\n\nKey Engineering Focus: This project demonstrates system thinking over page development. Rather than building isolated pages, the architecture emphasizes clear component boundaries, structured data modeling, predictable state management, and reusable components.",
    architecture: "Layered Component System: Layout Components (Header, Sidebar — structure only), Feature Components (BrandSelector, MetricCards, AuditModuleDetail — business logic), UI Primitives (shadcn/ui — intentionally generic). Zustand Stores: BrandStore (global, manages selected brand) and AuditStore (per-route, manages audit module selection). Data Flow: Brand selection → JSON loading → Feature components render with typed data. No page monoliths — each page.tsx is <150 lines. Full TypeScript with interfaces for metrics, audits, insights, issues, and recommendations.",
    features: [
      "Multi-Brand Dashboard with real-time switching and AI-readiness snapshots",
      "7 Parallel Audit Modules with detailed insights, issues, and recommendations",
      "System Architecture Visualization showing 4-step AI processing pipeline",
      "Layered Component Architecture with Layout, Feature, and UI Primitive separation",
      "Zustand State Management with global BrandStore and per-route AuditStore"
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Zustand"],
    github: "https://github.com/KushalM23/kasparro-frontend-Kushal-M",
    live: "https://kasparro-frontend-kushal-m.vercel.app",
  },
];

export interface Experience {
  id: number;
  title: string;
  company: string;
  dates: string;
  bullets: string[];
}
// Contributed production ready components, layouts, and reusable patterns.
// Helped building the company’s founding website using Next.js, TypeScript, and modern UI practices.
// Implemented conditional rendering flows to handle dynamic UI states and user interactions.
// Helped establish early coding standards and component structure with the engineering team

export const experienceData: Experience[] = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Global Dream Connect",
    dates: "Jan 2026 — Present",
    bullets: [
      "Contributed production ready components, layouts, and reusable patterns.",
      "Helped building the company’s founding website using Next.js, TypeScript, and modern UI practices.",
      "Implemented conditional rendering flows to handle dynamic UI states and user interactions.",
      "Helped establish early coding standards and component structure with the engineering team",
    ],
  }
];

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  content: string;
}

export const blogData: BlogPost[] = [
  {
    id: 1,
    title: "The Silent Scalability Challenge: Building Live Sports Scoreboards Without Overloading the Browser",
    date: "Feb 14, 2026",
    excerpt: "Broadcasting live results for 13 basketball games simultaneously taught me that SSE isn't just about technology—it's about respect for the client browser. How to avoid the polling death spiral?",
    slug: "real-time-architecture-scoard",
    content: "When you're building a real-time sports scoreboard, the obvious approach is polling: every 1-2 seconds, ask \"Did the score change?\" Seems simple. Until you realize 13 games running simultaneously means 13 fetch calls every second, and across thousands of concurrent users, your hosting bill becomes your company's bill.\n\nI started Scoard with that mistake. The first iteration hammered the NBA Stats API with relentless polling, and it worked—until it didn't. Users complained about battery drain on mobile. The API throttled my requests. Everything felt sluggish.\n\n## The SSE Insight\n\nServer-Sent Events are often overlooked in favor of WebSockets, but they're perfect for one-directional broadcasting (server → client). Instead of the client asking \"Did anything change?\" a million times, the server says \"Here's the new state when it changes.\"\n\nThe breakthrough: Per-game SSE pollers on the backend.\n\nInstead of one global poller that feeds all clients, I created isolated pollers per game ID. When a user opens game #1, a poller starts. When they open game #2, another poller starts. When all users close game #15, that poller dies.\n\nResult: Bandwidth scales with actual engagement, not potential engagement.\n\n## The Fallback Strategy\n\nRelying on the NBA CDN alone is risky—sometimes it lags. I implemented a fallback chain:\n\n1. Try NBA CDN (fastest, usually 1-2 second latency)\n2. If stale, fetch from NBA Stats API (authoritative, slower by ~3-5 seconds)\n3. Broadcast whichever came back with fresh data\n\nThis hybrid approach catches edge cases where the CDN is delayed without ever serving stale data to users.\n\n## Smart Polling Lifecycle\n\nA game that started 6 hours ago is mostly static. Why poll for updates? The poller detects game state (finished, halftime, etc.) and:\n\n- Game in-progress: Poll every 2 seconds\n- Halftime: Poll every 30 seconds (less frequent updates expected)\n- Game finished: Stop polling entirely\n\nThis simple logic reduced backend load by 60% without sacrificing user experience.\n\n## The Lesson\n\nReal-time architecture isn't about using the fanciest tool. It's about understanding your constraints (network, bandwidth, browser battery) and matching the technology to those constraints. SSE + intelligent polling + state awareness = silent scalability.\n\nScoard now handles spikes of 10,000+ concurrent users during Finals week without the infrastructure of a full real-time backend. The server just... knows when to talk, and when to stay quiet."
  },
  {
    id: 2,
    title: "The ESP32 Problem: When Hardware Constraints Force You to Rethink Software",
    date: "Feb 09, 2026",
    excerpt: "Building SmartAgriNode taught me that when you're dealing with unreliable hardware, traditional request/response API design breaks. The solution? A global command queue that fundamentally changed how I think about distributed systems.",
    slug: "hardware-driven-software-architecture",
    content: "I built SmartAgriNode with a naive assumption: HTTPclient on an ESP32 will work like a web browser. Make a request, get a response in 200ms, move on.\n\nReality hit hard when I realized:\n\n- The ESP32 takes 3-5 minutes to boot\n- Sensor reads sometimes timeout\n- The WiFi connection drops randomly\n- The camera takes 10 seconds to warm up\n\nTraditional request/response breaks under these conditions. If my backend waits for the device to respond, I either timeout or lock up the entire API.\n\n## The Command Queue Pattern\n\nI needed to decouple the request (user clicks \"Fetch Soil Data\") from the execution (ESP32 actually reads the sensor).\n\nArchitecture:\n\n1. User clicks \"Get Sensor Data\"\n2. Backend sets: COMMAND_QUEUE['default'] = \"MEASURE_SENSORS\"\n3. ESP32 polls /api/device/check-command every 3 seconds\n4. When it sees \"MEASURE_SENSORS\", it reads the sensors\n5. ESP32 POSTs results to /api/device/update-sensors\n6. Frontend polls /api/device/sensors/latest until it gets fresh data\n\nThis pattern is nothing new—manufacturing uses it constantly. But it was a revelation in the web context: sometimes, \"please do this task\" is a better API design than \"do this task synchronously.\"\n\n## 360° Field Scanning\n\nFor weed detection, the ESP32-CAM rotates 360° with a stepper motor, capturing 8 images per 45° rotation. If the stepper jams, the entire scan breaks.\n\nSolution: Fault tolerance at every step.\n\nEach image upload is independent:\n- Image 1 uploaded → Processing starts\n- Image 2 fails to upload → Skip and continue\n- Image 3 uploaded → Results include partial scan data\n- Image 5 returns later → Update results incrementally\n\nUsers see \"7 of 8 images processed\" instead of a hard failure. The system heals itself.\n\n## Lessons for Web Developers\n\nIf you've always worked with cloud servers, hardware integration teaches humility:\n\n1. Assume failure — Your device will disconnect. Design for it.\n2. Async is non-negotiable — Your hardware is your entire bottleneck.\n3. Visibility is everything — Users want to know \"still scanning,\" not frozen UI.\n4. Polling isn't evil — It's a legitimate pattern for unreliable systems.\n\nSmartAgriNode's command queue pattern now appears in every hardware integration I build. It's the dirty secret that makes IoT work.\n\n## The Real Lesson\n\nThe best software doesn't fight its constraints—it designs for them. Every time I wanted to \"fix\" the hardware (make the ESP32 respond faster), I was solving the wrong problem. The real solution was architecture that accepted hardware reality and built around it.\n\nThat's when the system stopped feeling fragile and started feeling robust."
  },
  {
    id: 3,
    title: "One Package to Rule Them All: How Shared Types Unified Web, Mobile, and Backend",
    date: "Feb 02, 2026",
    excerpt: "At NextTern, we built the same platform in three different languages/frameworks: React Web, React Native Mobile, and Node.js Backend. The key to not going insane? A single shared/ package that every team imports.",
    slug: "shared-type-systems-scale",
    content: "Three repos, three codebases, one problem: Ensuring that when the backend defines a User, the web app and mobile app agree on what fields exist.\n\nDuplication is the enemy of consistency. If backend User has profileUrl, but the web app thinks it's avatarUrl, you've got a bug that only surfaces at runtime.\n\n## The Traditional Trap\n\nMost teams solve this by documentation:\n\n\"Backend engineers, please tell web that User has these fields.\"\n\"Mobile engineers, we updated the API. Here's the new contract.\"\n[Three weeks later]\n\"Web still expects the old field. Spent 2 hours debugging.\"\n\nDocumentation fails because it's not enforced. The code doesn't know what the docs say.\n\n## The Solution: Shared Types\n\nNextTern has a /shared TypeScript package that lives in the root monorepo.\n\nEvery platform imports from @next-tern/shared:\n\n- Backend (Express): import { User, Internship } from '@next-tern/shared'\n- Web (React): import { User } from '@next-tern/shared'\n- Mobile (React Native): import { User } from '@next-tern/shared'\n\nNow when the backend team adds lastSeenAt: Date to User, both web and mobile get TypeScript errors immediately if they don't handle the new field.\n\nNo documentation. No runtime surprises. Just type safety.\n\n## The Beauty of This Pattern\n\n1. Single Source of Truth — Definition lives once\n2. Enforcement — Violations are compile-time errors, not runtime bugs\n3. Evolution — When contracts change, every team knows\n4. Cross-Platform Consistency — Web and mobile behave identically because they use identical types\n\n## The Complexity We Avoided\n\nWithout shared types, we'd have implemented the same User interface three times — each with subtly different field names. avatar vs avatarUrl vs profilePicture. Subtle differences cascade into bugs. API returns avatar, but mobile expects profilePicture. Empty database, but the code compiled fine.\n\n## The Cost of This Pattern\n\nShared packages aren't free:\n\n1. Complexity — One more workspace to manage\n2. Publishing — Version bumping across teams\n3. Breaking Changes — If shared types change, all three platforms must update\n\nFor NextTern's scale (3 platforms, 2 engineers coordinating), the hassle is worth it. The guarantee of type safety across platforms is worth managing one extra package.\n\n## When This Pattern Works\n\nUse shared types when:\n- Multiple teams share the same data models\n- The codebases are tightly coupled (can't afford runtime mismatches)\n- TypeScript is your primary language\n\nSkip it when:\n- You have a single monolithic codebase\n- Your APIs are public and you can't control clients\n- You're not using TypeScript\n\nFor us at NextTern, it was a no-brainer. The alternative—manual synchronization—is a maintenance nightmare waiting to happen."
  },
  {
    id: 4,
    title: "Pages Are a Lie: How I Stopped Building Pages and Started Building Systems",
    date: "Jan 28, 2026",
    excerpt: "Kasparro taught me that thinking in terms of 'pages' is limiting. When you shift to 'systems,' you unlock reusability, consistency, and architectural clarity that pages can never provide.",
    slug: "system-driven-design",
    content: "When I started Kasparro, I made a decision that fundamentally changed how I design products: I would never build a page directly.\n\nInstead, every page is a composition of systems.\n\n## The Traditional Approach\n\nMost developers think in pages:\n\n\"Build a dashboard page\"\n\"Build an audit page\"\n\"Build an architecture page\"\n\nEach page owns its own state, its own components, its own data flow. If you need the same UI pattern on two pages, you duplicate code or create a generic component that lives in a /shared folder and slowly becomes unmaintainable.\n\nThis works for small projects. It breaks fast as complexity grows.\n\n## The Systems Approach\n\nKasparro is built on three conscious layers:\n\n### Layer 1: Layout Components\nThe skeleton of the page structure. Header, DashboardHeader, Sidebar — zero business logic. They're just containers, boring on purpose.\n\n### Layer 2: Feature Components\nThe actual product. BrandSelector reads and updates BrandStore. MetricCards receives brand from store, loads dashboard.json for that brand, displays AI Visibility and E-E-A-T scores. Each feature component has a single responsibility, manages its own data loading, delegates rendering to UI primitives, and can be reused in different pages.\n\n### Layer 3: UI Primitives\nThe lego blocks from shadcn/ui. Card, Button, Badge, Select — generic, reusable, consistently styled. No state, no business logic.\n\n## How It Comes Together\n\nA page is just orchestration — 10 lines of code composing existing systems. The heavy lifting is in layers below. When I need to reuse MetricCards on another page? Just import it. No duplication, no component sprawl.\n\n## The Payoff\n\n1. Consistency — Change how a metric looks once, every page using it updates automatically.\n2. Scalability — New page needed? Compose existing features. You're not starting from scratch.\n3. Clarity — Developers immediately see: \"This page is Header (layout) + MetricCards (feature) + Card, Button (primitives).\"\n4. Testing — Testing a feature component is simple: Pass props, assert output.\n\n## Why Zustand Fits This Model\n\nI use Zustand (not Context) because the stores are the \"connective tissue\" between layers. BrandStore connects the Header (can select brand) to Feature components (consume selected brand). Stores don't contain logic. They contain state. Logic lives in components. This separation is what makes the system cohesive.\n\n## The Bigger Lesson\n\n\"Building pages\" is a frontend-specific illusion. Real products are built from data models, state management, feature logic, and presentation. When you design with systems in mind, pages become simple. And when pages are simple, the entire codebase becomes maintainable.\n\nFor Kasparro, this approach meant I could build 7 routes, 40+ components, and hundreds of type definitions in a way that feels coherent rather than chaotic.\n\nPages are a lie. Systems are the truth."
  }
];
