import "dotenv/config";

const env = {
  API_KEY: process.env.API_KEY,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? "JS4Lif3",
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY ?? "15m",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? "J5K1nGk3l4s",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY ?? "7d",
  REDIS_URL: process.env.REDIS_URL ?? "",
};

export default env;
