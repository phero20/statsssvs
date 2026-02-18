export interface GithubGraphqlResponse {
  user: {
    login: string;
    name: string | null;
    avatarUrl: string;
    bio: string | null;
    company: string | null;
    location: string | null;
    email: string | null;
    twitterUsername: string | null;
    websiteUrl: string | null;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: {
      totalCount: number;
      nodes: {
        stargazerCount: number;
      }[];
    };
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
    };
  };
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
  color?: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface RepoStats {
  totalStars: number;
  highestStars: number;
  totalRepos: number;
}

export interface UserStatsResponse {
  profile: {
    login: string;
    name: string | null;
    avatarUrl: string;
    bio: string | null;
    followers: number;
    following: number;
  };
  repoStats: RepoStats;
  streaks: {
    currentStreak: number;
    longestStreak: number;
  };
  contributions: ContributionCalendar;
}
