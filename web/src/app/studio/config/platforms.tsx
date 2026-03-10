import React from "react";
import {
  Globe,
  Github,
  Code2,
  BarChart2,
  Linkedin,
  User,
  Camera,
  Mail,
  SaveIcon,
} from "lucide-react";
import { StudioStoreKey } from "@/store/useStudioStore";

export interface PlatformConfig {
  id: string;
  title: string;
  placeholder: string;
  icon: React.ElementType;
  variant:
    | "github"
    | "leetcode"
    | "codeforces"
    | "portfolio"
    | "linkedin"
    | "name"
    | "photo"
    | "email";
  storeKey: StudioStoreKey;
  buttonIcon?: React.ElementType;
}

export const integrations: PlatformConfig[] = [
  {
    id: "name",
    title: "Full Name",
    placeholder: "Enter full name...",
    icon: User,
    variant: "name",
    buttonIcon: SaveIcon,
    storeKey: "fullName",
  },
  {
    id: "portfolio",
    title: "Portfolio URL",
    placeholder: "Enter website URL...",
    icon: Globe,
    variant: "portfolio",
    buttonIcon: SaveIcon,
    storeKey: "portfolioUrl",
  },
  {
    id: "github",
    title: "GitHub Username",
    placeholder: "Enter username...",
    icon: Github,
    variant: "github",
    storeKey: "githubUser",
  },
  {
    id: "codeforces",
    title: "Codeforces Handle",
    placeholder: "Enter handle...",
    icon: BarChart2,
    variant: "codeforces",
    storeKey: "codeforcesUser",
  },
  {
    id: "leetcode",
    title: "Leetcode Username",
    placeholder: "Enter username...",
    icon: Code2,
    variant: "leetcode",
    storeKey: "leetcodeUser",
  },
  {
    id: "photo",
    title: "Profile Photo URL",
    placeholder: "Enter image URL...",
    icon: Camera,
    variant: "photo",
    buttonIcon: SaveIcon,
    storeKey: "photoUrl",
  },
  {
    id: "linkedin",
    title: "LinkedIn URL",
    placeholder: "Enter LinkedIn URL...",
    icon: Linkedin,
    variant: "linkedin",
    storeKey: "linkedinUrl",
  },
  {
    id: "email",
    title: "Public Email",
    placeholder: "Enter public email...",
    icon: Mail,
    variant: "email",
    buttonIcon: SaveIcon,
    storeKey: "emailUrl",
  },
];
