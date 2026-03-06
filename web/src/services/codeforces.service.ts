import { api } from "@/lib/eden";

export const CodeforcesService = {
  fetchFullStats: async (username: string) => {
    // Strongly typed access to the new Codeforces endpoint
    const { data, error } = await api.codeforces["full-stats"]({
      username,
    }).get();

    // Throw error if user is invalid or rate limited
    if (error) {
      throw new Error(
        error.value?.message || "Failed to fetch Codeforces stats",
      );
    }

    // Return inner payload payload (CodeforcesStatsResponse)
    return data.data;
  },
};
