import { getConfig } from "@/shared/configs/config";
import { HttpClient } from "@/shared/lib/http-client";

export interface IGitHubClient {
  fetch<T>(path: string, options?: RequestInit): Promise<T>;
  graphql<T>(query: string, variables?: Record<string, any>): Promise<T>;
}

export class GitHubClient implements IGitHubClient {
  private restClient: HttpClient;
  private graphqlClient: HttpClient;

  constructor() {
    this.restClient = new HttpClient(getConfig("githubApiUrl"));
    this.graphqlClient = new HttpClient(getConfig("githubGraphqlUrl"));
  }

  async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getConfig("githubToken");
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return this.restClient.get<T>(path, { ...options, headers });
  }

  async graphql<T>(
    query: string,
    variables: Record<string, any> = {},
  ): Promise<T> {
    const token = getConfig("githubToken");
    if (!token) {
      throw new Error("GitHub Token is required for GraphQL requests");
    }

    const { data } = await this.graphqlClient.post<{ data: T; errors?: any[] }>(
      "",
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  }
}

export const githubClient = new GitHubClient();
