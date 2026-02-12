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
    description: "Real-time sports scoreboard with live game tracking, team stats, and a polished dark-mode UI built for speed.",
    longDescription: "Scoard is a high-performance, real-time sports scoreboard application designed for amateur leagues and local tournaments. It replaces manual scorekeeping with a digital, cloud-synced platform that updates instantly across all connected devices. Built with a focus on speed and reliability, it ensures that every goal, foul, and time-out is recorded and broadcast with zero latency.",
    architecture: "The system uses a WebSocket-based architecture for real-time data propagation. The frontend (Next.js) connects to a Node.js backend which manages game state in an in-memory Redis cache for ultra-low latency, while persisting match history to a PostgreSQL database. Optimistic UI updates ensure the scorekeeper never experiences lag.",
    features: [
      "Live Score Tracking with WebSocket updates",
      "Team Management & Roster stats",
      "Game Clock & Period control",
      "Responsive Dark Mode UI for outdoor visibility"
    ],
    techStack: ["TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Socket.io", "Redis"],
    previewImage: "/projects/scoard-preview.png",
    github: "https://github.com/KushalM23/Scoard",
    live: "https://scoard.onrender.com",
  },
  {
    id: 2,
    title: "Katalyst",
    description: "A modern web app designed to catalyze productivity with clean interface design and responsive layouts.",
    longDescription: "Katalyst is a productivity suite that combines task management, note-taking, and calendar scheduling into a single, cohesive interface. The design philosophy centers on 'flow'—minimizing friction between having an idea and capturing it. It features a drag-and-drop Kanban board, markdown support for notes, and a daily planner view.",
    architecture: "Built as a modular monolith using Next.js App Router. It leverages Server Components for data fetching and heavy lifting, keeping the client bundle small. State management is handled via Zustand for complex interactions like drag-and-drop. The database schema is designed for multi-tenancy from day one.",
    features: [
      "Kanban Board with Drag-and-Drop",
      "Markdown Note Editor",
      "Daily Planner & Calendar Sync",
      "Offline-first capability"
    ],
    techStack: ["TypeScript", "Next.js", "Vercel", "Zustand", "Prisma"],
    previewImage: "/projects/katalyst-preview.png",
    github: "https://github.com/KushalM23/Katalyst",
    live: "https://katalyst-nine.vercel.app",
  },
  {
    id: 3,
    title: "SmartAgriNode",
    description: "IoT-powered smart agriculture platform with real-time sensor dashboards, crop health analytics, and automated monitoring.",
    longDescription: "SmartAgriNode brings precision agriculture to small-scale farms. It connects soil moisture, temperature, and humidity sensors to a central dashboard, allowing farmers to monitor crop conditions remotely. The system analyzes historical data to predict irrigation needs and alerts farmers to potential pest risks based on environmental conditions.",
    architecture: "The architecture consists of three layers: The Edge (ESP32 microcontrollers collecting sensor data), The Cloud (Node.js API receiving MQTT messages), and The Client (React dashboard). Time-series data is stored in InfluxDB for efficient querying of historical trends.",
    features: [
      "Real-time Sensor Dashboard (Moisture, Temp, Humidity)",
      "Automated Irrigation Alerts",
      "Historical Data Analytics & Charts",
      "MQTT Device Management"
    ],
    techStack: ["JavaScript", "React", "Node.js", "MQTT", "InfluxDB", "ESP32"],
    previewImage: "/projects/smartagri-preview.png",
    github: "https://github.com/KushalM23/SmartAgriNode",
    live: "https://smart-agri-node.vercel.app",
  },
  {
    id: 4,
    title: "Crawrchet",
    description: "Creative portfolio and interactive experience with smooth animations, gallery views, and multi-channel contact.",
    longDescription: "Crawrchet is an experimental portfolio designed to showcase creative coding skills. It moves away from standard layouts, utilizing complex scroll-driven animations and interactive 3D elements. The goal was to create a web experience that feels like an art installation rather than a resume.",
    architecture: "A single-page application (SPA) built with React and Framer Motion. It uses a virtual scroll container to manage performance with heavy DOM elements. All animations are hardware-accelerated. Assets are optimized and lazy-loaded to ensure fast Time-to-Interactive (TTI).",
    features: [
      "Scroll-driven Storytelling",
      "Interactive 3D Elements (Three.js)",
      "Custom Cursor & Hover Effects",
      "Dynamic Theme Switching"
    ],
    techStack: ["JavaScript", "React", "Framer Motion", "Three.js", "WebGL"],
    previewImage: "/projects/crawrchet-preview.png",
    github: "https://github.com/KushalM23/Crawrchet",
    live: "https://crawrchet.vercel.app",
  },
  {
    id: 5,
    title: "AutoAqua",
    description: "Automated aquaponics management system with sensor integration and intelligent water quality monitoring.",
    longDescription: "AutoAqua automates the maintenance of aquaponics systems, where fish and plants grow together. It monitors water pH, temperature, and ammonia levels, automatically adjusting pumps and feeders to maintain the perfect ecosystem balance. It reduces the manual labor required to maintain a healthy system by 80%.",
    architecture: "The system runs on a Raspberry Pi local server which interfaces with analog sensors via an ADC. A Python backend handles the control logic (PID loops for pH balance) and serves a lightweight HTML/JS frontend over the local network for configuration.",
    features: [
      "Automated pH & Temperature Control",
      "Feeding Schedule Management",
      "Water Quality Alerts",
      "Local Network Dashboard"
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Python", "Raspberry Pi"],
    previewImage: "/projects/autoaqua-preview.png",
    github: "https://github.com/KushalM23/AutoAqua",
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
    title: "The Return of Analog UI",
    date: "Oct 24, 2025",
    excerpt: "Why flat design is dead and skeuomorphism is making a comeback in a post-digital age.",
    slug: "return-of-analog-ui",
    content: "We spent the last decade perfecting flat design. Removing textures, simplifying gradients, and turning everything into abstract rectangles. But something has shifted. The digital world feels sterile. We crave the tactile. The click of a switch, the grain of film, the imperfection of a cassette tape.\n\nSkeuomorphism isn't just about nostalgia; it's about affordance. When a button looks like a button, you know it pushes. When a window has depth, you know it floats. We're seeing a resurgence of 'analog digital'—interfaces that borrow from the physical world to create warmth and connection in a cold glass screen."
  },
  {
    id: 2,
    title: "Building IoT Dashboards",
    date: "Sep 12, 2025",
    excerpt: "Lessons learned from visualizing real-time sensor data for smart agriculture systems.",
    slug: "building-iot-dashboards",
    content: "Real-time data is messy. Sensors fail, connections drop, and values spike unpredictably. Validating data at the edge is crucial. In building SmartAgriNode, the biggest challenge wasn't the React frontend, but handling the WebSocket deluge without freezing the main thread.\n\nWe moved data processing to Web Workers and used throtlling for updates. The result? A silky smooth 60fps dashboard even when hundreds of sensors are broadcasting simultaneously. Visualizing invisible data (soil moisture, pH levels) requires not just charts, but meaningful indicators—green is good, red is panic."
  },
  {
    id: 3,
    title: "Next.js 15: First Impressions",
    date: "Aug 05, 2025",
    excerpt: "Exploring the new features, partial prerendering, and what it means for DX.",
    slug: "nextjs-15-first-impressions",
    content: "Next.js 15 is here, and Turbopack is finally stable. The build times are almost instant. But the real game changer is Partial Prerendering (PPR). The ability to mix static shells with dynamic holes without manual suspense boundaries everywhere is magical.\n\nI converted my portfolio to use the new App Router cache semantics. It takes some getting used to—everything is dynamic by default if you use headers()—but the mental model is clearer. No more accidental static pages serving stale auth data."
  }
];
