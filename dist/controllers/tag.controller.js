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
exports.CDeleteTag = exports.CUpdateTag = exports.CCreateTag = exports.CGetTagById = exports.CGetAllTags = void 0;
var utils_1 = require("../utils");
var tag_services_1 = __importDefault(require("../services/tag.services"));
var CGetAllTags = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tags, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, tag_services_1.default.findAll()];
            case 1:
                tags = _a.sent();
                res.json((0, utils_1.formatResponse)(200, "Success", tags));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: "Failed to retrieve tags" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CGetAllTags = CGetAllTags;
var CGetTagById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, tags, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, tag_services_1.default.findById(id)];
            case 1:
                tags = _a.sent();
                if (!tags) {
                    res.status(404).json({ error: "Article not found" });
                    return [2 /*return*/];
                }
                res.json((0, utils_1.formatResponse)(200, "Success", tags));
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: "Failed to retrieve tags" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CGetTagById = CGetTagById;
var CCreateTag = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newTag, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, tag_services_1.default.create(req.body)];
            case 1:
                newTag = _a.sent();
                res.json((0, utils_1.formatResponse)(201, "Success", newTag));
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: "Failed to create tag" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CCreateTag = CCreateTag;
var CUpdateTag = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedTag, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, tag_services_1.default.update(id, req.body)];
            case 1:
                updatedTag = _a.sent();
                if (!updatedTag) {
                    res.status(404).json({ error: "Tag not found" });
                    return [2 /*return*/];
                }
                res.json((0, utils_1.formatResponse)(200, "Success", updatedTag));
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ error: "Failed to update tag" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CUpdateTag = CUpdateTag;
var CDeleteTag = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedTag, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, tag_services_1.default.remove(id)];
            case 1:
                deletedTag = _a.sent();
                if (!deletedTag) {
                    res.status(404).json({ error: "Tag not found" });
                    return [2 /*return*/];
                }
                res.json((0, utils_1.formatResponse)(200, "Success", deletedTag));
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ error: "Failed to delete tag" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CDeleteTag = CDeleteTag;
//# sourceMappingURL=tag.controller.js.map