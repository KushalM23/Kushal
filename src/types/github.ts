export interface GitHubUserProfile {
  login: string;
  name: string | null;
  bio?: string | null;
  html_url?: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepositoryOwner {
  login: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  default_branch: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
  owner: GitHubRepositoryOwner;
}

export interface GitHubRepositoryTopicsResponse {
  names: string[];
}

export type GitHubRepositoryLanguages = Record<string, number>;

export interface GitHubRepositoryContentResponse {
  content: string;
  encoding: string;
  type: string;
}

export interface GitHubEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload?: {
    action?: string;
    ref_type?: string;
  };
}

export interface GitHubPortfolioMetadata {
  title?: string;
  featured?: boolean;
  demo?: string;
  image?: string;
  tech?: string[];
  summary?: string;
  longDescription?: string;
  architecture?: string;
  features?: string[];
  year?: string;
  status?: string;
}
