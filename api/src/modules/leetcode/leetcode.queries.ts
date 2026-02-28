export const GET_LEETCODE_USER_STATS_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      githubUrl
      twitterUrl
      linkedinUrl
      profile {
        realName
        userAvatar
        ranking
        reputation
        starRating
        aboutMe
        company
        countryName
        school
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      badges {
        id
        name
        shortName
        displayName
        icon
      }
      languageProblemCount {
        languageName
        problemsSolved
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;
