import { create } from "zustand";

interface StudioState {
  selectedPlatforms: string[];
  usernames: Record<string, string>;
  togglePlatform: (platformId: string) => void;
  isPlatformSelected: (platformId: string) => boolean;
  setUsername: (platformId: string, username: string) => void;
  getUsername: (platformId: string) => string;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  selectedPlatforms: ["github"],
  usernames: {},

  togglePlatform: (platformId) => {
    const { selectedPlatforms } = get();
    if (selectedPlatforms.includes(platformId)) {
      set({
        selectedPlatforms: selectedPlatforms.filter((id) => id !== platformId),
      });
    } else {
      set({
        selectedPlatforms: [...selectedPlatforms, platformId],
      });
    }
  },

  isPlatformSelected: (platformId) => {
    return get().selectedPlatforms.includes(platformId);
  },

  setUsername: (platformId, username) => {
    set((state) => ({
      usernames: { ...state.usernames, [platformId]: username },
    }));
  },

  getUsername: (platformId) => {
    return get().usernames[platformId] ?? "";
  },
}));
