import { getConfig } from "../../shared/configs/config";

export interface IGitHubClient {
  fetch<T>(path: string, options?: RequestInit): Promise<T>;
  graphql<T>(query: string, variables?: Record<string, any>): Promise<T>;
}

export class GitHubClient implements IGitHubClient {
  async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getConfig("githubToken");
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${getConfig("githubApiUrl")}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `GitHub API error: ${response.status}`,
      );
    }

    return response.json();
  }

  async graphql<T>(
    query: string,
    variables: Record<string, any> = {},
  ): Promise<T> {
    const token = getConfig("githubToken");
    if (!token) {
      throw new Error("GitHub Token is required for GraphQL requests");
    }

    const response = await fetch(getConfig("githubGraphqlUrl"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const res = await response.json();

    if (!response.ok || res.errors) {
      const message =
        res.errors?.[0]?.message || res.message || "GraphQL Error";
      throw new Error(message);
    }

    return res.data;
  }
}

// Export a singleton instance for default use
export const githubClient = new GitHubClient();
