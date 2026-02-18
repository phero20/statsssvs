import { ContributionCalendar, RepoStats } from "./github.types";

export const calculateStreaks = (calendar: ContributionCalendar) => {
  const days = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .sort((a, b) => a.date.localeCompare(b.date));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date().toISOString().split("T")[0];

  for (let i = 0; i < days.length; i++) {
    const day = days[i];

    if (day.contributionCount > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      // If we encounter a day with no contributions, reset tempStreak
      // But only if it's before today.
      tempStreak = 0;
    }

    // Update current streak logic:
    // If it's today or yesterday and has contributions, it's part of the current streak
    if (day.date === today) {
      currentStreak = tempStreak;
    }
  }

  // Double check current streak if "today" hasn't had a contribution yet
  // but yesterday did.
  if (currentStreak === 0 && days.length > 0) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const yesterdayData = days.find((d) => d.date === yesterdayStr);
    if (yesterdayData && yesterdayData.contributionCount > 0) {
      // Find what the streak was ending yesterday
      let yStreak = 0;
      const yIdx = days.findIndex((d) => d.date === yesterdayStr);
      for (let i = yIdx; i >= 0; i--) {
        if (days[i].contributionCount > 0) yStreak++;
        else break;
      }
      currentStreak = yStreak;
    }
  }

  return { currentStreak, longestStreak };
};

export const aggregateRepoStats = (
  nodes: { stargazerCount: number }[],
  totalCount: number,
): RepoStats => {
  return nodes.reduce(
    (acc, node) => {
      acc.totalStars += node.stargazerCount;
      if (node.stargazerCount > acc.highestStars) {
        acc.highestStars = node.stargazerCount;
      }
      return acc;
    },
    { totalStars: 0, highestStars: 0, totalRepos: totalCount },
  );
};
