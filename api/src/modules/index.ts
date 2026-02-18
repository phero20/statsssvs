import { Elysia } from "elysia";
import { github } from "./github/github.controller";

export const api = new Elysia({ prefix: "/api/v1" }).use(github);
