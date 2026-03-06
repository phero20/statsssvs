import { api } from "@/lib/eden";

export const LeetcodeService = {
  fetchFullStats: async (username: string) => {
    // Navigate the typed Elysia router path
    const { data, error } = await api.leetcode["full-stats"]({
      username,
    }).get();

    // Transform API errors into JS Errors for React Query
    if (error) {
      throw new Error(error.value?.message || "Failed to fetch LeetCode stats");
    }

    // Extract the raw payload data
    return data.data;
  },
};
