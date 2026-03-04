export interface HttpClientOptions extends RequestInit {
    params?: Record<string, string>;
    interceptors?: {
        beforeRequest?: (options: HttpClientOptions) => Promise<HttpClientOptions> | HttpClientOptions;
        afterResponse?: (response: Response) => Promise<void> | void;
        onError?: (error: Error) => Promise<void> | void;
    };
}
export declare class HttpClient {
    private baseUrl;
    constructor(baseUrl?: string);
    private request;
    get<T>(path: string, options?: HttpClientOptions): Promise<T>;
    post<T>(path: string, body?: any, options?: HttpClientOptions): Promise<T>;
}
