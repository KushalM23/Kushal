import content from "../../content/portfolio.json";

function addedText(value: unknown, fallback: string) {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function addedList(value: unknown) {
    return Array.isArray(value)
        ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
        : [];
}

export const profileData = {
    ...content.profileData,
    name: addedText(content.profileData?.name, "UNKNOWN_OPERATOR"),
    tagline: addedText(content.profileData?.tagline, "SOFTWARE_ENGINEER"),
    bio: addedText(content.profileData?.bio, "// NO_PROFILE_DATA_ADDED"),
};
export const experienceData = (Array.isArray(content.experienceData) ? content.experienceData : []).map((entry, index) => ({
    id: typeof entry?.id === "number" ? entry.id : index + 1,
    title: addedText(entry?.title, "// NO_ROLE_ADDED"),
    company: addedText(entry?.company, "// NO_COMPANY_ADDED"),
    dates: addedText(entry?.dates, "// NO_DATE_RANGE_ADDED"),
    bullets: addedList(entry?.bullets),
}));
export const blogData = (Array.isArray(content.blogData) ? content.blogData : []).map((post, index) => ({
    id: typeof post?.id === "number" ? post.id : index + 1,
    title: addedText(post?.title, "// NO_ENTRY_TITLE_ADDED"),
    date: addedText(post?.date, "// NO_DATE_ADDED"),
    excerpt: addedText(post?.excerpt, "// NO_EXCERPT_ADDED"),
    slug: addedText(post?.slug, `entry-${index + 1}`),
    content: addedText(post?.content, "// NO_ENTRY_CONTENT_ADDED"),
}));
export interface ProjectSource {
  github: string;
  live?: string;
  featured?: boolean;
  funFacts?: string[];
  overrides?: Partial<Project>;
}

export const projectSources = content.projects as ProjectSource[];

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  architecture: string;
  features: string[];
  techStack: string[];
  previewImage?: string;
  screenshots?: string[];
  funFacts?: string[];
  sourceStructure?: string[];
  framework?: string;
  github: string;
  live?: string;
  unavailable?: boolean;
  error?: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  dates: string;
  bullets: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  content: string;
}
