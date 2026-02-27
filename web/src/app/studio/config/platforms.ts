import githubIcon from "@/assets/icons/github.png";
import leetcodeIcon from "@/assets/icons/leetcode.png";
import codeforcesIcon from "@/assets/icons/codeforces.png";

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
