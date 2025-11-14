import { createClient } from 'redis';

const redisClient = createClient({
  url: `rediss://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:6379`, 
});


redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));
redisClient.on("connect", () => console.log("✅ Redis Client Connected"));

export default redisClient;

// Function to get data from cache
// Function to get data from cache
export const getFromCache = async (cacheKey: string): Promise<any | null> => {
  try {
    const cachedData = await redisClient.get(cacheKey);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (err) {
    console.error("❌ Error retrieving from cache:", err);
    return null;
  }
};

// Function to set data in cache
export const setToCache = async (
  cacheKey: string,
  data: any,
  ttl?: number
): Promise<void> => {
  try {
    await redisClient.set(cacheKey, JSON.stringify(data), {
      EX: ttl,
    });
    console.log("✅ Cache set successfully");
  } catch (err) {
    console.error("❌ Error setting cache:", err);
  }
};

//Function to delete the cache
export const deleteFromCache = async (cacheKey: string): Promise<void> => {
  try {
    await redisClient.del(cacheKey);
    console.log("✅ Cache deleted successfully");
  } catch (err) {
    console.error("❌ Error deleting cache:", err);
  }
};


export const deleteFromCacheByPrefix = async (prefix: string): Promise<void> => {
  try {
    const keys = await redisClient.keys(`${prefix}*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`✅ Deleted ${keys.length} keys from cache with prefix "${prefix}"`);
    } else {
      console.log(`ℹ️ No cache keys found with prefix "${prefix}"`);
    }
  } catch (err) {
    console.error("❌ Error deleting cache:", err);
  }
};
