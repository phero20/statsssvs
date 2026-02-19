import { Elysia } from "elysia";
import { GitHubService } from "@/modules/github/github.service";
import { GitHubRepository } from "@/modules/github/github.repository";
import { GithubParamsSchema } from "@/modules/github/github.schema";
import { githubClient } from "@/modules/github/github.client";
import { successResponse } from "@/shared/utils/api-handler";

// Dependency Injection Chain
const repository = new GitHubRepository(githubClient);
const service = new GitHubService(repository);

export const github = (app: Elysia) =>
  app.get(
    "/full-stats/:username",
    async ({ params: { username } }) => {
      const stats = await service.fetchDetailedUserStats(username);
      return successResponse(stats);
    },
    {
      params: GithubParamsSchema,
    },
  );
