export interface CodeforcesUserResponse {
  status: "OK" | "FAILED";
  comment?: string; // Contains error message if FAILED
  result?: {
    handle: string;
    email?: string;
    vkId?: string;
    openId?: string;
    firstName?: string;
    lastName?: string;
    country?: string;
    city?: string;
    organization?: string;
    contribution: number;
    rank: string;
    rating: number;
    maxRank: string;
    maxRating: number;
    lastOnlineTimeSeconds: number;
    registrationTimeSeconds: number;
    friendOfCount: number;
    avatar: string;
    titlePhoto: string;
  }[];
}

export interface CodeforcesStatsResponse {
  handle: string;
  rating: number;
  rank: string;
  maxRating: number;
  maxRank: string;
  contribution: number;
  titlePhoto: string;
}
