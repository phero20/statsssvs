import { treaty } from "@elysiajs/eden";
import type { App } from "@api/index";
import { config } from "@/constants/config";

const eden = treaty<App>(config.apiUrl);

// Export a prefixed version for cleaner code (Axios-like experience)
// We use the full path access to avoid any type flattening ambiguities
export const api = eden.api.v1;
