import { getConfig } from "@/shared/configs/config";
import { HttpClient } from "@/shared/lib/http-client";

const restHttpClient = new HttpClient(getConfig("codeforcesApiUrl"));

export const codeforcesClient = {
  get: async <T>(
    endpoint: string,
    params: Record<string, string> = {},
  ): Promise<T> => {
    const data = await restHttpClient.get<T>(endpoint, { params });
    return data;
  },
};
