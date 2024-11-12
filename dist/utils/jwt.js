"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateRefreshToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var env_config_1 = __importDefault(require("../config/env.config"));
var generateToken = function (userId) {
    return jsonwebtoken_1.default.sign({ userId: userId }, env_config_1.default.ACCESS_TOKEN_SECRET, {
        expiresIn: env_config_1.default.ACCESS_TOKEN_EXPIRY,
    });
};
exports.generateToken = generateToken;
var generateRefreshToken = function (userId) {
    return jsonwebtoken_1.default.sign({ userId: userId }, env_config_1.default.REFRESH_TOKEN_SECRET, {
        expiresIn: env_config_1.default.REFRESH_TOKEN_EXPIRY,
    });
};
exports.generateRefreshToken = generateRefreshToken;
var verifyToken = function (token, secret) {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map