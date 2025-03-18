import { createClient } from "redis";

const redisClient = createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379,
    },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
    await redisClient.connect(); // Ensure Redis is connected
})();

/**
 * Get cached data from Redis or set it if not found.
 * @param key
 * @param ttl
 * @param fetchData
 * @returns
 */
export const getOrSetCache = async <T>(
    key: string,
    ttl: number,
    fetchData: () => Promise<T>
): Promise<T> => {
    try {
        const cachedData = await redisClient.get(key);

        if (cachedData) {
            console.log(`Cache hit: ${key}`);
            return JSON.parse(cachedData) as T;
        }

        console.log(`Cache miss: ${key}, fetching fresh data...`);
        const freshData = await fetchData();

        await redisClient.setEx(key, ttl, JSON.stringify(freshData));

        return freshData;
    } catch (error) {
        console.error("Redis error:", error);
        throw error;
    }
};

export const getOrSetCacheJsVersion = async (key, ttl, fetchData) => {
    try {
        const cachedData = await redisClient.get(key);

        if (cachedData) {
            console.log(`Cache hit: ${key}`);
            return JSON.parse(cachedData);
        }

        console.log(`Cache miss: ${key}, fetching fresh data...`);
        const freshData = await fetchData();

        // Cache the fresh data with TTL
        await redisClient.setEx(key, ttl, JSON.stringify(freshData));

        return freshData;
    } catch (error) {
        console.error("Redis error:", error);
        throw error;
    }
};

export default redisClient;
