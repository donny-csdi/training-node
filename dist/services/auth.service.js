"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var uuid_1 = require("uuid");
var env_config_1 = __importDefault(require("../config/env.config"));
var utils_1 = require("../utils");
var jwt_1 = require("../utils/jwt");
var refreshTokens = [];
var usersFile = "users.json";
var register = function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var users, userExists, hashedPassword, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                users = (0, utils_1.readJSONFile)(usersFile);
                userExists = users.some(function (user) { return user.username === username; });
                if (userExists) {
                    throw (0, utils_1.createError)("User already exists", 400);
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 1:
                hashedPassword = _a.sent();
                newUser = {
                    id: (0, uuid_1.v4)(),
                    username: username,
                    password: hashedPassword,
                };
                users.push(newUser);
                (0, utils_1.writeJSONFile)(usersFile, users);
                return [2 /*return*/, {
                        id: newUser.id,
                        username: newUser.username,
                    }];
        }
    });
}); };
var login = function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var users, user, isPasswordValid, accessToken, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                users = (0, utils_1.readJSONFile)(usersFile);
                user = users.find(function (user) { return user.username === username; });
                if (!user) {
                    throw (0, utils_1.createError)("User not found", 404);
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 1:
                isPasswordValid = _a.sent();
                if (!isPasswordValid) {
                    throw (0, utils_1.createError)("Invalid password", 400);
                }
                accessToken = (0, jwt_1.generateToken)(user.id);
                refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
                refreshTokens.push(refreshToken);
                return [2 /*return*/, { accessToken: accessToken, refreshToken: refreshToken }];
        }
    });
}); };
var refreshToken = function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedToken, user, accessToken, newRefreshToken;
    return __generator(this, function (_a) {
        if (!refreshTokens.includes(refreshToken)) {
            throw (0, utils_1.createError)("Invalid refresh token", 400);
        }
        decodedToken = (0, jwt_1.verifyToken)(refreshToken, env_config_1.default.REFRESH_TOKEN_SECRET);
        user = (0, utils_1.readJSONFile)(usersFile).find(function (user) { return user.id === decodedToken.userId; });
        if (!user) {
            throw (0, utils_1.createError)("User not found", 404);
        }
        accessToken = (0, jwt_1.generateToken)(user.id);
        newRefreshToken = (0, jwt_1.generateRefreshToken)(user.id);
        refreshTokens = refreshTokens.filter(function (token) { return token !== refreshToken; });
        refreshTokens.push(newRefreshToken);
        return [2 /*return*/, { accessToken: accessToken, refreshToken: newRefreshToken }];
    });
}); };
var SAuth = {
    register: register,
    login: login,
    refreshToken: refreshToken,
};
exports.default = SAuth;
//# sourceMappingURL=auth.service.js.map