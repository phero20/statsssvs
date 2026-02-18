import { Elysia } from "elysia";
import { GitHubService } from "./github.service";
import { GithubParamsSchema } from "./github.schema";
import { githubClient } from "./github.client";

const service = new GitHubService(githubClient);

export const github = new Elysia({ prefix: "/github" }).get(
  "/full-stats/:username",
  async ({ params: { username } }) => {
    return await service.fetchDetailedUserStats(username);
  },
  {
    params: GithubParamsSchema,
  },
);
