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
exports.CRefreshToken = exports.CRegister = exports.CLogin = void 0;
var utils_1 = require("../utils");
var auth_service_1 = __importDefault(require("../services/auth.service"));
var CLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, _b, accessToken, refreshToken, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                if (!username || !password) {
                    res.status(400).json((0, utils_1.formatResponse)(400, "Bad Request", null));
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, auth_service_1.default.login(username, password)];
            case 2:
                _b = _c.sent(), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                res.json((0, utils_1.formatResponse)(200, "Success", { accessToken: accessToken, refreshToken: refreshToken }));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.CLogin = CLogin;
var CRegister = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, newUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                if (!username || !password) {
                    res.status(400).json((0, utils_1.formatResponse)(400, "Bad Request", null));
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, auth_service_1.default.register(username, password)];
            case 2:
                newUser = _b.sent();
                res.json((0, utils_1.formatResponse)(200, "Success", newUser));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.CRegister = CRegister;
var CRefreshToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, accessToken, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.body.refreshToken;
                if (!refreshToken) {
                    res.status(400).json((0, utils_1.formatResponse)(400, "Bad Request", null));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, auth_service_1.default.refreshToken(refreshToken)];
            case 2:
                accessToken = _a.sent();
                res.json((0, utils_1.formatResponse)(200, "Success", { accessToken: accessToken }));
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.CRefreshToken = CRefreshToken;
//# sourceMappingURL=auth.controller.js.map