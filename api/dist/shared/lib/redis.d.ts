import Redis from "ioredis";
/**
 * Singleton Redis client instance.
 * ioredis automatically handles reconnection and command queuing.
 */
export declare const redis: Redis;
export declare const CACHE_TTL: {
    SHORT: number;
    MEDIUM: number;
    LONG: number;
};
