export interface ProfileEducationEntry {
  degree: string;
  institution: string;
  dates: string;
  details?: string[];
}

export interface ProfileExperienceEntry {
  id: string;
  title: string;
  company: string;
  dates: string;
  bullets: string[];
}

export interface ProfileAchievementEntry {
  title: string;
  detail: string;
}

export interface ProfileContent {
  name: string;
  role: string;
  tagline?: string;
  bio: string;
  githubUsername?: string;
  github: string;
  linkedin?: string;
  email?: string;
  education: ProfileEducationEntry[];
  experience: ProfileExperienceEntry[];
  achievements: ProfileAchievementEntry[];
  resumeUrl: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  content: string;
}

export interface PortfolioProject {
  slug: string;
  order: number;
  title: string;
  description: string;
  longDescription: string;
  architecture: string;
  features: string[];
  techStack: string[];
  previewImage?: string;
  github: string;
  live?: string;
  featured: boolean;
  year: string;
  status: string;
}

export interface PortfolioSkill {
  name: string;
  bytes: number;
  repoCount: number;
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  latestActivity: string;
}
