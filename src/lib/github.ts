import "server-only";

import { cache } from "react";
import {
  GitHubEvent,
  GitHubPortfolioMetadata,
  GitHubRepository,
  GitHubRepositoryContentResponse,
  GitHubRepositoryLanguages,
  GitHubRepositoryTopicsResponse,
  GitHubUserProfile,
} from "@/types/github";

const GITHUB_API_BASE = "https://api.github.com";
export const GITHUB_REVALIDATE_SECONDS = 3600;

function getGitHubHeaders() {
  const token = process.env.GITHUB_TOKEN?.trim();

  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchGitHub<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    headers: getGitHubHeaders(),
    next: { revalidate: GITHUB_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed (${response.status}) for ${path}`);
  }

  return response.json() as Promise<T>;
}

export const getGitHubUserProfile = cache(async (username: string): Promise<GitHubUserProfile> => {
  return fetchGitHub<GitHubUserProfile>(`/users/${encodeURIComponent(username)}`);
});

export const getGitHubRepositories = cache(async (username: string): Promise<GitHubRepository[]> => {
  return fetchGitHub<GitHubRepository[]>(
    `/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100`,
  );
});

export async function getGitHubRepositoryTopics(owner: string, repo: string): Promise<string[]> {
  try {
    const response = await fetchGitHub<GitHubRepositoryTopicsResponse>(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/topics`,
    );

    return response.names;
  } catch (error) {
    console.error(`Unable to fetch topics for ${owner}/${repo}`, error);
    return [];
  }
}

export async function getGitHubRepositoryLanguages(
  owner: string,
  repo: string,
): Promise<GitHubRepositoryLanguages> {
  try {
    return await fetchGitHub<GitHubRepositoryLanguages>(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
    );
  } catch (error) {
    console.error(`Unable to fetch languages for ${owner}/${repo}`, error);
    return {};
  }
}

export async function getGitHubRepositoryPortfolioMetadata(
  owner: string,
  repo: string,
  branch: string,
): Promise<GitHubPortfolioMetadata | null> {
  const path = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/portfolio.json?ref=${encodeURIComponent(branch)}`;

  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    headers: getGitHubHeaders(),
    next: { revalidate: GITHUB_REVALIDATE_SECONDS },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    console.error(`Unable to fetch portfolio.json for ${owner}/${repo}: ${response.status}`);
    return null;
  }

  const payload = (await response.json()) as GitHubRepositoryContentResponse;

  if (payload.type !== "file" || payload.encoding !== "base64") {
    return null;
  }

  try {
    const content = Buffer.from(payload.content, "base64").toString("utf8");
    return JSON.parse(content) as GitHubPortfolioMetadata;
  } catch (error) {
    console.error(`Unable to parse portfolio.json for ${owner}/${repo}`, error);
    return null;
  }
}

export const getGitHubLatestActivity = cache(async (username: string): Promise<GitHubEvent | null> => {
  try {
    const events = await fetchGitHub<GitHubEvent[]>(
      `/users/${encodeURIComponent(username)}/events/public?per_page=10`,
    );

    return events[0] ?? null;
  } catch (error) {
    console.error(`Unable to fetch activity for ${username}`, error);
    return null;
  }
});
