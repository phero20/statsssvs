import React from "react";
import githubIcon from "@/assets/icons/github.png";
import leetcodeIcon from "@/assets/icons/leetcode.png";
import codeforcesIcon from "@/assets/icons/codeforces.png";
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

export interface PlatformConfig {
  id: string;
  title: string;
  href: string;
  icon: any;
  color: string;
  colorTo: string;
}

export const PLATFORM_CONFIG: PlatformConfig[] = [
  {
    id: "github",
    title: "GitHub",
    href: "#github",
    icon: githubIcon,
    color: "var(--color-github)",
    colorTo: "var(--color-mint)",
  },
  {
    id: "leetcode",
    title: "LeetCode",
    href: "#leetcode",
    icon: leetcodeIcon,
    color: "var(--color-leetcode)",
    colorTo: "var(--color-mint)",
  },
  {
    id: "codeforces",
    title: "Codeforces",
    href: "#codeforces",
    icon: codeforcesIcon,
    color: "var(--color-codeforces)",
    colorTo: "var(--color-mint)",
  },
];

export const integrations = [
  {
    id: "name",
    title: "Full Name",
    placeholder: "Enter full name...",
    icon: <User className="h-6 w-6" />,
    iconColorClass: "text-name",
    glowClass: "drop-shadow-[0_0_12px_var(--color-name)]",
    titleGradientClass: "via-name",
    inputFocusClass: "focus:border-name focus:ring-1 focus:ring-name/50",
    buttonHoverClass:
      "hover:border-name/50 hover:bg-name/10 hover:ring-1 hover:ring-name hover:ring-offset-1 hover:ring-offset-background",
    activeBgClass: "bg-name",
    className: "col-span-1 sm:col-span-1 lg:col-span-1",
    buttonIcon: <SaveIcon className="h-5 w-5 transition-transform" />,
  },
  {
    id: "portfolio",
    title: "Portfolio URL",
    placeholder: "Enter website URL...",
    icon: <Globe className="h-6 w-6" />,
    iconColorClass: "text-portfolio",
    glowClass: "drop-shadow-[0_0_12px_var(--color-portfolio)]",
    titleGradientClass: "via-portfolio",
    inputFocusClass:
      "focus:border-portfolio focus:ring-1 focus:ring-portfolio/50",
    buttonHoverClass:
      "hover:border-portfolio/50 hover:bg-portfolio/10 hover:ring-1 hover:ring-portfolio hover:ring-offset-1 hover:ring-offset-background",
    activeBgClass: "bg-portfolio",
    className: "col-span-1 sm:col-span-1 lg:col-span-1",
    buttonIcon: <SaveIcon className="h-5 w-5 transition-transform" />,
  },

  {
    id: "github",
    title: "GitHub Username",
    placeholder: "Enter username...",
    icon: <Github className="h-6 w-6" />,
    iconColorClass: "text-github",
    glowClass: "drop-shadow-[0_0_12px_var(--color-github)]",
    titleGradientClass: "via-github",
    inputFocusClass: "focus:border-github focus:ring-1 focus:ring-github/50",
    buttonHoverClass:
      "hover:border-github/50 hover:bg-github/10 hover:ring-1 hover:ring-github hover:ring-offset-1 hover:ring-offset-background",
    activeBgClass: "bg-github",
    className: "col-span-1 sm:col-span-2 lg:col-span-2",
  },
  {
    id: "codeforces",
    title: "Codeforces Handle",
    placeholder: "Enter handle...",
    icon: <BarChart2 className="h-6 w-6" />,
    iconColorClass: "text-codeforces",
    glowClass: "drop-shadow-[0_0_12px_var(--color-codeforces)]",
    titleGradientClass: "via-codeforces",
    inputFocusClass:
      "focus:border-codeforces focus:ring-1 focus:ring-codeforces/50",
    buttonHoverClass:
      "hover:border-codeforces/50 hover:bg-codeforces/10 hover:ring-1 hover:ring-codeforces hover:ring-offset-1 hover:ring-offset-background",
    activeBgClass: "bg-codeforces",
    className: "col-span-1 sm:col-span-1 lg:col-span-1",
  },
  {
    id: "leetcode",
    title: "Leetcode Username",
    placeholder: "Enter username...",
    icon: <Code2 className="h-6 w-6" />,
    iconColorClass: "text-leetcode",
    glowClass: "drop-shadow-[0_0_12px_var(--color-leetcode)]",
    titleGradientClass: "via-leetcode",
    inputFocusClass:
      "focus:border-leetcode focus:ring-1 focus:ring-leetcode/50",
    buttonHoverClass:
      "hover:border-leetcode/50 hover:bg-leetcode/10 hover:ring-1 hover:ring-leetcode hover:ring-offset-1 hover:ring-offset-background",
    activeBgClass: "bg-leetcode",
    className: "col-span-1 sm:col-span-1 lg:col-span-2",
  },
  {
    id: "photo",
    title: "Profile Photo URL",
    placeholder: "Enter image URL...",
    icon: <Camera className="h-6 w-6" />,
    iconColorClass: "text-photo",
    glowClass: "drop-shadow-[0_0_12px_var(--color-photo)]",
    titleGradientClass: "via-photo",
    inputFocusClass: "focus:border-photo focus:ring-1 focus:ring-photo/50",
    buttonHoverClass:
      "hover:border-photo/50 hover:bg-photo/10 hover:ring-1 hover:ring-photo hover:ring-offset-1 hover:ring-offset-background",
    activeBgClass: "bg-photo",
    className:
      "col-span-1 sm:col-span-1  lg:col-span-1 row-span-2 flex flex-col",
    buttonIcon: <SaveIcon className="h-5 w-5 transition-transform" />,
  },

  {
    id: "linkedin",
    title: "LinkedIn URL",
    placeholder: "Enter LinkedIn URL...",
    icon: <Linkedin className="h-6 w-6" />,
    iconColorClass: "text-linkedin",
    glowClass: "drop-shadow-[0_0_12px_var(--color-linkedin)]",
    titleGradientClass: "via-linkedin",
    inputFocusClass:
      "focus:border-linkedin focus:ring-1 focus:ring-linkedin/50",
    buttonHoverClass:
      "hover:border-linkedin/50 hover:bg-linkedin/10 hover:ring-1 hover:ring-linkedin hover:ring-offset-1 hover:ring-offset-background",
    activeBgClass: "bg-linkedin",
    className: "col-span-1 sm:col-span-1 lg:col-span-2",
  },
  {
    id: "email",
    title: "Public Email",
    placeholder: "Enter public email...",
    icon: <Mail className="h-6 w-6" />,
    iconColorClass: "text-email",
    glowClass: "drop-shadow-[0_0_12px_var(--color-email)]",
    titleGradientClass: "via-email",
    inputFocusClass:
      "focus:border-email focus:ring-1 focus:ring-email/50",
    buttonHoverClass:
      "hover:border-email/50 hover:bg-email/10 hover:ring-1 hover:ring-email hover:ring-offset-1 hover:ring-offset-background",
    activeBgClass: "bg-email",
    className: "col-span-1 sm:col-span-1 lg:col-span-1",
    buttonIcon: <SaveIcon className="h-5 w-5 transition-transform" />,
  },
];
