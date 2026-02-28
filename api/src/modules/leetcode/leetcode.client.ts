import { getConfig } from "@/shared/configs/config";
import { HttpClient } from "@/shared/lib/http-client";

// Initialize GraphQL Client for LeetCode
const graphqlHttpClient = new HttpClient(getConfig("leetcodeGraphqlUrl"));

export const leetcodeClient = {
  graphql: async <T>(
    query: string,
    variables: Record<string, any> = {},
  ): Promise<T> => {
    // LeetCode's GraphQL API is public for user profiles, so no token is needed.
    // However, it often requires a Content-Type and sometimes mimicking a browser
    // user agent to avoid being blocked by Cloudflare or basic rate limits.
    const { data } = await graphqlHttpClient.post<{ data: T; errors?: any[] }>(
      "",
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      },
    );

    return data;
  },
};
