"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.apikeyValidator = exports.checkAuth = exports.loggingMiddleware = exports.checkHeader = void 0;
var utils_1 = require("../utils");
var env_config_1 = __importDefault(require("../config/env.config"));
var jwt_1 = require("../utils/jwt");
var winston_config_1 = __importDefault(require("../config/winston.config"));
var checkHeader = function (req, res, next) {
    var contentType = req.headers["content-type"];
    var apiKey = req.headers["apikey"];
    if (contentType !== "application/json") {
        res.status(400).json((0, utils_1.formatResponse)(400, "Invalid Content Type"));
        return;
    }
    if (apiKey !== env_config_1.default.API_KEY) {
        res.status(401).json((0, utils_1.formatResponse)(401, "Unauthorized"));
        return;
    }
    return next();
};
exports.checkHeader = checkHeader;
var loggingMiddleware = function (req, res, next) {
    console.log("".concat(req.method, ":").concat(req.url));
    next();
};
exports.loggingMiddleware = loggingMiddleware;
var apikeyValidator = function (req, res, next) {
    var apikey = req.headers.apikey;
    if (apikey !== env_config_1.default.API_KEY) {
        res.json((0, utils_1.formatResponse)(401, "API Key Not Valid", null));
        return;
    }
    return next();
};
exports.apikeyValidator = apikeyValidator;
var errorHandler = function (err, req, res, next) {
    var statusCode = err.statusCode || 500;
    var message = err.message || "Internal Server Error";
    winston_config_1.default.error("".concat(statusCode, " - ").concat(message, " - Winston"));
    res.status(statusCode).json((0, utils_1.formatResponse)(statusCode, message, null));
};
exports.errorHandler = errorHandler;
var checkAuth = function (req, res, next) {
    var authHeader = req.headers["authorization"];
    var token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.json((0, utils_1.formatResponse)(401, "Unauthorized"));
        return;
    }
    try {
        var verify = (0, jwt_1.verifyToken)(token, env_config_1.default.ACCESS_TOKEN_SECRET);
        if (!verify) {
            if (verify === null) {
                res.status(403).json((0, utils_1.formatResponse)(403, "Token expired", null));
            }
            else {
                res.status(401).json((0, utils_1.formatResponse)(401, "Unauthorized", null));
            }
            return;
        }
    }
    catch (error) {
        res.status(500).json((0, utils_1.formatResponse)(500, error.message));
    }
    return next();
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=index.js.map