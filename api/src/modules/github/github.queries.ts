export const GET_USER_STATS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl
      bio
      company
      location
      email
      twitterUsername
      websiteUrl
      followers { totalCount }
      following { totalCount }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          stargazerCount
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;
