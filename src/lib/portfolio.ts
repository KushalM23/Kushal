import "server-only";

import { cache } from "react";
import blogPostsJson from "../../config/blog.json";
import profileJson from "../../config/profile.json";
import {
  getGitHubLatestActivity,
  getGitHubRepositories,
  getGitHubRepositoryLanguages,
  getGitHubRepositoryPortfolioMetadata,
  getGitHubRepositoryTopics,
  getGitHubUserProfile,
} from "@/lib/github";
import {
  BlogPost,
  GitHubStats,
  PortfolioProject,
  PortfolioSkill,
  ProfileContent,
} from "@/types/content";
import { GitHubEvent, GitHubPortfolioMetadata, GitHubRepository, GitHubRepositoryLanguages } from "@/types/github";

type PortfolioRepositoryRecord = {
  repo: GitHubRepository;
  metadata: GitHubPortfolioMetadata | null;
  languages: GitHubRepositoryLanguages;
};

const DEFAULT_RESUME_URL = "/resume.pdf";
const DEFAULT_ROLE = "Software Developer";
const DEFAULT_TAGLINE = "Building things from GitHub";
const DEFAULT_BIO =
  "GitHub-powered portfolio. Add repositories with the portfolio topic to showcase projects here.";

function getProfileGithubUsername() {
  const usernameOverride = process.env.GITHUB_USERNAME?.trim();

  if (usernameOverride) {
    return usernameOverride;
  }

  return "";
}

async function toProfileContent(): Promise<ProfileContent> {
  const username = getProfileGithubUsername();
  const profile = username ? await getGitHubUserProfile(username) : null;
  const displayName = profile?.name?.trim() || username || "Portfolio";
  const githubUrl = profile?.html_url?.trim() || (username ? `https://github.com/${username}` : "https://github.com");

  return {
    name: displayName,
    role: profileJson.role?.trim() || DEFAULT_ROLE,
    tagline: profileJson.tagline?.trim() || DEFAULT_TAGLINE,
    bio: profileJson.bio?.trim() || profile?.bio?.trim() || DEFAULT_BIO,
    githubUsername: username || profile?.login || "",
    github: githubUrl,
    linkedin: profileJson.linkedin?.trim() || undefined,
    email: profileJson.email?.trim() || undefined,
    education: profileJson.education || [],
    experience: profileJson.experience || [],
    achievements: profileJson.achievements || [],
    resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL?.trim() || DEFAULT_RESUME_URL,
  };
}

function sortLanguagesByBytes(languages: GitHubRepositoryLanguages) {
  return Object.entries(languages).sort((left, right) => right[1] - left[1]);
}

function resolveTechStack(
  metadata: GitHubPortfolioMetadata | null,
  repo: GitHubRepository,
  languages: GitHubRepositoryLanguages,
) {
  if (metadata?.tech?.length) {
    return metadata.tech;
  }

  const rankedLanguages = sortLanguagesByBytes(languages).map(([name]) => name);

  if (rankedLanguages.length > 0) {
    return rankedLanguages;
  }

  return repo.language ? [repo.language] : ["GitHub"];
}

function resolveProjectImage(
  metadata: GitHubPortfolioMetadata | null,
  repo: GitHubRepository,
) {
  if (!metadata?.image) {
    return undefined;
  }

  if (/^https?:\/\//i.test(metadata.image)) {
    return metadata.image;
  }

  const normalizedPath = metadata.image.replace(/^\.?\//, "");
  return `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${repo.default_branch}/${normalizedPath}`;
}

function resolveProjectYear(metadata: GitHubPortfolioMetadata | null, repo: GitHubRepository) {
  if (metadata?.year) {
    return metadata.year;
  }

  const createdYear = new Date(repo.created_at).getUTCFullYear();
  const updatedYear = new Date(repo.updated_at).getUTCFullYear();

  return createdYear === updatedYear ? String(createdYear) : `${createdYear}-${updatedYear}`;
}

function resolveProjectStatus(metadata: GitHubPortfolioMetadata | null, repo: GitHubRepository) {
  if (metadata?.status) {
    return metadata.status.toUpperCase();
  }

  return repo.archived ? "ARCHIVED" : "COMPLETED";
}

function toPortfolioProject(record: PortfolioRepositoryRecord, order: number): PortfolioProject {
  const { repo, metadata, languages } = record;
  const baseDescription =
    metadata?.summary ||
    repo.description ||
    "Portfolio repository synced from GitHub. Add portfolio.json for richer detail.";

  return {
    slug: repo.name,
    order,
    title: metadata?.title || repo.name,
    description: baseDescription,
    longDescription: metadata?.longDescription || baseDescription,
    architecture: metadata?.architecture || "",
    features: metadata?.features || [],
    techStack: resolveTechStack(metadata, repo, languages),
    previewImage: resolveProjectImage(metadata, repo),
    github: repo.html_url,
    live: metadata?.demo || repo.homepage || undefined,
    featured: Boolean(metadata?.featured),
    year: resolveProjectYear(metadata, repo),
    status: resolveProjectStatus(metadata, repo),
  };
}

function formatLatestActivity(event: GitHubEvent | null) {
  if (!event) {
    return "No recent public activity";
  }

  const repoName = event.repo.name.split("/").pop() || event.repo.name;

  switch (event.type) {
    case "PushEvent":
      return `Pushed changes to ${repoName}`;
    case "CreateEvent":
      return `Created ${event.payload?.ref_type || "content"} in ${repoName}`;
    case "PullRequestEvent":
      return `Updated a pull request in ${repoName}`;
    case "IssuesEvent":
      return `Updated an issue in ${repoName}`;
    case "WatchEvent":
      return `Starred ${repoName}`;
    default:
      return `Recent ${event.type.replace(/Event$/, "")} on ${repoName}`;
  }
}

function toPortfolioSkills(records: PortfolioRepositoryRecord[]): PortfolioSkill[] {
  const languageMap = new Map<string, PortfolioSkill>();

  for (const record of records) {
    for (const [name, bytes] of Object.entries(record.languages)) {
      const existing = languageMap.get(name);

      if (existing) {
        existing.bytes += bytes;
        existing.repoCount += 1;
      } else {
        languageMap.set(name, { name, bytes, repoCount: 1 });
      }
    }
  }

  return [...languageMap.values()]
    .sort((left, right) => {
      if (right.repoCount !== left.repoCount) {
        return right.repoCount - left.repoCount;
      }

      return right.bytes - left.bytes;
    })
    .slice(0, 8);
}

export const getProfileContent = cache(async (): Promise<ProfileContent> => {
  return toProfileContent();
});

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return [...blogPostsJson];
});

const getPortfolioRepositoryRecords = cache(async (): Promise<PortfolioRepositoryRecord[]> => {
  const username = getProfileGithubUsername();

  if (!username) {
    console.error("Missing GitHub username. Set GITHUB_USERNAME.");
    return [];
  }

  const repositories = await getGitHubRepositories(username);
  const topicPairs = await Promise.all(
    repositories.map(async (repo) => ({
      repo,
      topics: await getGitHubRepositoryTopics(repo.owner.login, repo.name),
    })),
  );

  const portfolioRepos = topicPairs
    .filter(({ topics }) => topics.includes("portfolio"))
    .map(({ repo }) => repo);

  const records = await Promise.all(
    portfolioRepos.map(async (repo) => ({
      repo,
      metadata: await getGitHubRepositoryPortfolioMetadata(repo.owner.login, repo.name, repo.default_branch),
      languages: await getGitHubRepositoryLanguages(repo.owner.login, repo.name),
    })),
  );

  return records
    .sort((left, right) => {
      const leftFeatured = left.metadata?.featured ? 1 : 0;
      const rightFeatured = right.metadata?.featured ? 1 : 0;

      if (leftFeatured !== rightFeatured) {
        return rightFeatured - leftFeatured;
      }

      return new Date(right.repo.updated_at).getTime() - new Date(left.repo.updated_at).getTime();
    });
});

export const getPortfolioProjects = cache(async (): Promise<PortfolioProject[]> => {
  const records = await getPortfolioRepositoryRecords();

  return records.map((record, index) => toPortfolioProject(record, index + 1));
});

export const getPortfolioSkills = cache(async (): Promise<PortfolioSkill[]> => {
  const records = await getPortfolioRepositoryRecords();
  return toPortfolioSkills(records);
});

export const getGitHubStats = cache(async (): Promise<GitHubStats> => {
  const username = getProfileGithubUsername();

  if (!username) {
    return {
      publicRepos: 0,
      followers: 0,
      following: 0,
      totalStars: 0,
      latestActivity: "GitHub profile unavailable",
    };
  }

  const [profile, repositories, latestActivity] = await Promise.all([
    getGitHubUserProfile(username),
    getGitHubRepositories(username),
    getGitHubLatestActivity(username),
  ]);

  return {
    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    totalStars: repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    latestActivity: formatLatestActivity(latestActivity),
  };
});

export const getPortfolioProjectBySlug = cache(async (slug: string) => {
  const projects = await getPortfolioProjects();
  return projects.find((project) => project.slug.toLowerCase() === slug.toLowerCase()) ?? null;
});

export const getBlogPostBySlug = cache(async (slug: string) => {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
});

export const getPortfolioPageData = cache(async () => {
  const profile = await getProfileContent();
  const blogPosts = await getBlogPosts();

  const [projectsResult, skillsResult, statsResult] = await Promise.allSettled([
    getPortfolioProjects(),
    getPortfolioSkills(),
    getGitHubStats(),
  ]);

  return {
    profile,
    blogPosts,
    projects: projectsResult.status === "fulfilled" ? projectsResult.value : [],
    skills: skillsResult.status === "fulfilled" ? skillsResult.value : [],
    stats:
      statsResult.status === "fulfilled"
        ? statsResult.value
        : {
            publicRepos: 0,
            followers: 0,
            following: 0,
            totalStars: 0,
            latestActivity: "GitHub data unavailable",
          },
  };
});
