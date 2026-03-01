export interface LeetcodeGraphqlResponse {
  matchedUser: {
    username: string;
    githubUrl: string | null;
    twitterUrl: string | null;
    linkedinUrl: string | null;
    profile: {
      realName: string | null;
      userAvatar: string;
      ranking: number;
      reputation: number;
      starRating: number;
      aboutMe: string | null;
      company: string | null;
      countryName: string | null;
      school: string | null;
    };
    submitStats: {
      acSubmissionNum: {
        difficulty: string;
        count: number;
        submissions: number;
      }[];
    };
    badges: {
      id: string;
      name: string;
      shortName: string;
      displayName: string;
      icon: string;
    }[];
    languageProblemCount: {
      languageName: string;
      problemsSolved: number;
    }[];
  } | null;
  userContestRanking: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
  } | null;
  allQuestionsCount: {
    difficulty: string;
    count: number;
  }[];
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
}
