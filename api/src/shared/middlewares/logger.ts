import { Elysia } from "elysia";

export const logger = new Elysia().onAfterHandle(({ request, set }) => {
  const { method, url } = request;
  const status = Number(set.status || 200);
  const color = status >= 400 ? "❌" : "✅";

  console.log(
    `${color} [${new Date().toLocaleTimeString()}] ${method} ${new URL(url).pathname} - ${status}`,
  );
});
