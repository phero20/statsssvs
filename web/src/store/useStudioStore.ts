import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StudioState {
  // Competitive & Coding Profiles
  githubUser: string;
  leetcodeUser: string;
  codeforcesUser: string;

  // Personal Details
  fullName: string;
  portfolioUrl: string;
  linkedinUrl: string;
  emailUrl: string;
  photoUrl: string;
  setField: (field: keyof Omit<StudioState, "setField">, value: string) => void;
}

export type StudioStoreKey = keyof Omit<StudioState, "setField">;

export const useStudioStore = create<StudioState>()(
  persist(
    (set) => ({
      // Default values
      githubUser: "",
      leetcodeUser: "",
      codeforcesUser: "",
      fullName: "",
      portfolioUrl: "",
      linkedinUrl: "",
      emailUrl: "",
      photoUrl: "",
      setField: (field, value) =>
        set((state) => ({
          ...state,
          [field]: value,
        })),
    }),
    {
      name: "devstats-studio-storage", // The unique key in browser localStorage
    },
  ),
);
