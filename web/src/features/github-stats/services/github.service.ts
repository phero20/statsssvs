import { api } from "@/lib/eden";

export const githubService = {
  fetchFullStats: async (username: string, signal?: AbortSignal) => {
    const { data, error } = await api.github["full-stats"]({
      username,
    }).get({
      fetch: {
        signal,
      },
    });

    if (error) {
      // Eden Treaty types the error value based on our error middleware
      const message =
        (error.value as any)?.message || "Failed to fetch GitHub stats";
      throw new Error(message);
    }

    if (!data) {
      throw new Error("No data received from API");
    }

    // Now 'data' is typed correctly thanks to the explicit wrapper in the backend
    return data.data;
  },
};
