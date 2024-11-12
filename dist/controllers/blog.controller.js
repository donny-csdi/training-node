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
exports.CDeleteBlog = exports.CUpdateBlog = exports.CCreateBlog = exports.CGetBlogById = exports.CGetAllBlogs = void 0;
var blog_service_1 = __importDefault(require("../services/blog.service"));
var utils_1 = require("../utils");
var CGetAllBlogs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blogs, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, blog_service_1.default.findAll()];
            case 1:
                blogs = _a.sent();
                res.json((0, utils_1.formatResponse)(200, "Success", blogs));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: "Failed to retrieve blogs" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CGetAllBlogs = CGetAllBlogs;
var CGetBlogById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, blog, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, blog_service_1.default.findById(id)];
            case 1:
                blog = _a.sent();
                if (!blog) {
                    res.status(404).json({ error: "Blog not found" });
                    return [2 /*return*/];
                }
                res.json((0, utils_1.formatResponse)(200, "Success", blog));
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: "Failed to retrieve blog" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CGetBlogById = CGetBlogById;
var CCreateBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newBlog, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, blog_service_1.default.create(req.body)];
            case 1:
                newBlog = _a.sent();
                res.json((0, utils_1.formatResponse)(201, "Success", newBlog));
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: "Failed to create blog" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CCreateBlog = CCreateBlog;
var CUpdateBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedBlog, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, blog_service_1.default.update(id, req.body)];
            case 1:
                updatedBlog = _a.sent();
                if (!updatedBlog) {
                    res.status(404).json({ error: "Blog not found" });
                    return [2 /*return*/];
                }
                res.json((0, utils_1.formatResponse)(200, "Success", updatedBlog));
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ error: "Failed to update blog" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CUpdateBlog = CUpdateBlog;
var CDeleteBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedBlog, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, blog_service_1.default.remove(id)];
            case 1:
                deletedBlog = _a.sent();
                if (!deletedBlog) {
                    res.status(404).json({ error: "Blog not found" });
                    return [2 /*return*/];
                }
                res.json((0, utils_1.formatResponse)(200, "Success", deletedBlog));
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ error: "Failed to delete blog" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CDeleteBlog = CDeleteBlog;
//# sourceMappingURL=blog.controller.js.map