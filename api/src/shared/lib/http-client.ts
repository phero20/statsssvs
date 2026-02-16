import { ExternalAPIError } from "../utils/errors";
import { getConfig } from "../configs/config";

export interface HttpClientOptions extends RequestInit {
  params?: Record<string, string>;
  interceptors?: {
    beforeRequest?: (
      options: HttpClientOptions,
    ) => Promise<HttpClientOptions> | HttpClientOptions;
    afterResponse?: (response: Response) => Promise<void> | void;
    onError?: (error: Error) => Promise<void> | void;
  };
}

export class HttpClient {
  constructor(private baseUrl: string = "") {}

  private async request<T>(
    path: string,
    options: HttpClientOptions = {},
  ): Promise<T> {
    const { params, interceptors, ...fetchOptions } = options;

    let url = path.startsWith("http") ? path : `${this.baseUrl}${path}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    let finalOptions = { ...fetchOptions };

    try {
      if (interceptors?.beforeRequest) {
        finalOptions = await interceptors.beforeRequest(finalOptions);
      }

      // Simple Logging Interceptor
      if (getConfig("nodeEnv") !== "production") {
        console.log(`[HTTP] → ${finalOptions.method || "GET"} ${url}`);
      }
      const startTime = Date.now();

      const response = await fetch(url, finalOptions);

      if (interceptors?.afterResponse) {
        await interceptors.afterResponse(response);
      }

      const duration = Date.now() - startTime;
      if (getConfig("nodeEnv") !== "production") {
        console.log(`[HTTP] ← ${response.status} (${duration}ms) ${url}`);
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ExternalAPIError(
          errorData.message ||
            `API request failed with status ${response.status}`,
          response.status,
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return response.json();
      }

      return (await response.text()) as unknown as T;
    } catch (error) {
      if (interceptors?.onError) {
        await interceptors.onError(error as Error);
      }
      throw error;
    }
  }

  get<T>(path: string, options?: HttpClientOptions) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T>(path: string, body?: any, options?: HttpClientOptions) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options?.headers },
    });
  }
}
