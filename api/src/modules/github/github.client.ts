import { getConfig } from "@/shared/configs/config";
import { HttpClient } from "@/shared/lib/http-client";
import { UnauthorizedError } from "@/shared/utils/errors";

// Initialize GraphQL Client
const graphqlHttpClient = new HttpClient(getConfig("githubGraphqlUrl"));

export const githubClient = {
  graphql: async <T>(
    query: string,
    variables: Record<string, any> = {},
  ): Promise<T> => {
    const token = getConfig("githubToken");
    if (!token) {
      throw new UnauthorizedError(
        "GitHub Token is required for GraphQL requests",
      );
    }

    const { data } = await graphqlHttpClient.post<{ data: T; errors?: any[] }>(
      "",
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  },
};
