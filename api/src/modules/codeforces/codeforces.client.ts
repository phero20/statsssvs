import { getConfig } from "@/shared/configs/config";
import { HttpClient } from "@/shared/lib/http-client";

// Initialize REST Client for Codeforces
const restHttpClient = new HttpClient(getConfig("codeforcesApiUrl"));

export const codeforcesClient = {
  get: async <T>(
    endpoint: string,
    params: Record<string, string> = {},
  ): Promise<T> => {
    // Codeforces is a public REST API. We don't need authentication tokens.
    const data = await restHttpClient.get<T>(endpoint, { params });
    return data;
  },
};
