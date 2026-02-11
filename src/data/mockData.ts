export const profileData = {
  name: "Kushal",
  tagline: "Full-Stack Developer · Builder · Problem Solver",
  bio: "I design and build software that solves real problems — from smart agriculture IoT dashboards to live sports scoreboards. I care deeply about clean code, thoughtful UX, and shipping products that people actually want to use.",
  github: "https://github.com/KushalM23",
  linkedin: "https://www.linkedin.com/in/kushalm2301/",
  email: "kushalm2301@gmail.com",
};

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  github: string;
  live?: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Scoard",
    description: "Real-time sports scoreboard with live game tracking, team stats, and a polished dark-mode UI built for speed.",
    techStack: ["TypeScript", "Next.js", "Tailwind CSS"],
    github: "https://github.com/KushalM23/Scoard",
    live: "https://scoard.onrender.com",
  },
  {
    id: 2,
    title: "Katalyst",
    description: "A modern web app designed to catalyze productivity with clean interface design and responsive layouts.",
    techStack: ["TypeScript", "Next.js", "Vercel"],
    github: "https://github.com/KushalM23/Katalyst",
    live: "https://katalyst-nine.vercel.app",
  },
  {
    id: 3,
    title: "SmartAgriNode",
    description: "IoT-powered smart agriculture platform with real-time sensor dashboards, crop health analytics, and automated monitoring.",
    techStack: ["JavaScript", "React", "Node.js"],
    github: "https://github.com/KushalM23/SmartAgriNode",
    live: "https://smart-agri-node.vercel.app",
  },
  {
    id: 4,
    title: "Crawrchet",
    description: "Creative portfolio and interactive experience with smooth animations, gallery views, and multi-channel contact.",
    techStack: ["JavaScript", "React", "Framer Motion"],
    github: "https://github.com/KushalM23/Crawrchet",
    live: "https://crawrchet.vercel.app",
  },
  {
    id: 5,
    title: "AutoAqua",
    description: "Automated aquaponics management system with sensor integration and intelligent water quality monitoring.",
    techStack: ["HTML", "CSS", "JavaScript"],
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

export const experienceData: Experience[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Kasparro",
    dates: "Dec 2025 — Present",
    bullets: [
      "Building responsive frontend interfaces with TypeScript and Next.js deployed on Vercel",
      "Collaborating in an agile team to ship features on tight timelines",
      "Implementing pixel-perfect designs from Figma with attention to accessibility",
    ],
  },
  {
    id: 2,
    title: "IoT & Full Stack Developer",
    company: "SmartAgriNode",
    dates: "Jun 2025 — Dec 2025",
    bullets: [
      "Designed real-time sensor dashboards for smart agriculture with React and Node.js",
      "Integrated IoT hardware with cloud-based monitoring and alert systems",
      "Deployed production app on Vercel serving real-world agricultural data",
    ],
  },
  {
    id: 3,
    title: "Freelance Developer",
    company: "Self-Employed",
    dates: "2024 — 2025",
    bullets: [
      "Built multiple client-facing web apps with modern frameworks",
      "Created interactive portfolio experiences with advanced CSS and Framer Motion",
      "Developed AutoAqua IoT monitoring system and CCA Python applications",
    ],
  },
];
