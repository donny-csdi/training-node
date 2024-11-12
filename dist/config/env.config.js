"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var env = {
    API_KEY: process.env.API_KEY,
    ACCESS_TOKEN_SECRET: (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : "JS4Lif3",
    ACCESS_TOKEN_EXPIRY: (_b = process.env.ACCESS_TOKEN_EXPIRY) !== null && _b !== void 0 ? _b : "15m",
    REFRESH_TOKEN_SECRET: (_c = process.env.REFRESH_TOKEN_SECRET) !== null && _c !== void 0 ? _c : "J5K1nGk3l4s",
    REFRESH_TOKEN_EXPIRY: (_d = process.env.REFRESH_TOKEN_EXPIRY) !== null && _d !== void 0 ? _d : "7d",
    REDIS_URL: (_e = process.env.REDIS_URL) !== null && _e !== void 0 ? _e : "",
};
exports.default = env;
//# sourceMappingURL=env.config.js.map