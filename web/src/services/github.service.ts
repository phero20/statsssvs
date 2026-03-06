import { api } from "@/lib/eden";

export const GithubService = {
  fetchFullStats: async (username: string) => {
    // Eden Treaty auto-infers the backend Elysia API structure!
    const { data, error } = await api.github["full-stats"]({ username }).get();

    // If there's an HTTP error (like 404 or 429), throw so React Query triggers 'isError'
    if (error) {
      throw new Error(error.value?.message || "Failed to fetch GitHub stats");
    }

    // `data.data` contains the actual UserStatsResponse, fully typed!
    return data.data;
  },
};
