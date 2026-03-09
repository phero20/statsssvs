export interface AlfaProfileResponse {
  username: string;
  name: string;
  birthday: string | null;
  avatar: string;
  ranking: number;
  reputation: number;
  gitHub: string | null;
  twitter: string | null;
  linkedIN: string | null;
  school: string | null;
  skillTags: string[];
  about: string;
  country: string;
  company: string | null;
}

export interface AlfaContestResponse {
  contestAttend: number;
  contestRating: number;
  contestGlobalRanking: number;
  contestTopPercentage: number;
  contestBadges: any;
  contestParticipation: any[];
}

export interface AlfaBadgesResponse {
  badgesCount: number;
  badges: {
    id: string;
    displayName: string;
    icon: string;
    creationDate: string;
  }[];
  upcomingBadges: any[];
  activeBadge: any;
}

export interface AlfaLanguageResponse {
  languageProblemCount: {
    languageName: string;
    problemsSolved: number;
  }[];
}

export interface AlfaSolvedResponse {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissionNum: {
    difficulty: string;
    count: number;
    submissions: number;
  }[];
  acSubmissionNum: {
    difficulty: string;
    count: number;
    submissions: number;
  }[];
}

export interface AlfaCalendarResponse {
  activeYears: number[];
  streak: number;
  totalActiveDays: number;
  submissionCalendar: string;
}

export type Difficulty = "All" | "Easy" | "Medium" | "Hard";

export interface DifficultyStats {
  difficulty: Difficulty;
  count: number;
  submissions: number;
  acceptanceRate?: number;
}

export interface LeetcodeStatsResponse {
  profile: {
    username: string;
    realName: string | null;
    userAvatar: string;
    ranking: number;
    reputation: number;
    starRating: number;
    githubUrl: string | null;
    twitterUrl: string | null;
    linkedinUrl: string | null;
  };
  contest: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    topPercentage: number;
  } | null;
  submitStats: DifficultyStats[];
  questionsTotal: {
    difficulty: Difficulty;
    count: number;
  }[];
  languages: {
    languageName: string;
    problemsSolved: number;
  }[];
  badges: {
    name: string;
    icon: string;
  }[];
  calendar: {
    activeYears: number[];
    streak: number;
    totalActiveDays: number;
    submissionCalendar: Record<string, number>;
  };
}
