import { Elysia } from "elysia";
import { getConfig } from "../configs/config";

export const logger = new Elysia({ name: "logger-middleware" })
  .derive({ as: "global" }, () => ({
    _startTime: Date.now(),
  }))
  .onAfterHandle({ as: "global" }, ({ request, set, _startTime }) => {
    const { method, url } = request;
    const status = Number(set.status || 200);
    const duration = Date.now() - (_startTime as number);
    const path = new URL(url).pathname;

    const logData = {
      timestamp: new Date().toISOString(),
      method,
      path,
      status,
      duration: `${duration}ms`,
    };

    if (getConfig("nodeEnv") === "production") {
      console.log(JSON.stringify(logData));
    } else {
      const color = status >= 400 ? "❌" : "✅";
      const time = logData.timestamp.split("T")[1].split(".")[0];
      console.log(
        `${color} [${time}] ${method} ${path} - ${status} (${logData.duration})`,
      );
    }
  });
