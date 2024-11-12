"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMathDeleteByIndex = exports.CMathHistory = exports.CMathOperations = exports.CMathList = void 0;
var math_service_1 = require("../services/math.service");
var utils_1 = require("../utils");
var fs_1 = __importDefault(require("fs"));
var CMathList = function (req, res) {
    var dataList = ["Add", "Subtract", "Multiply", "Divide"];
    res.status(200).json((0, utils_1.formatResponse)(200, "Success", dataList));
};
exports.CMathList = CMathList;
var CMathOperations = function (req, res) {
    var _a = Object.keys(req.query).length !== 0
        ? req.query
        : Object.keys(req.params).length !== 0
            ? req.params
            : req.body, valueA = _a.valueA, operation = _a.operation, valueB = _a.valueB;
    var numA = Number(valueA);
    var numB = Number(valueB);
    try {
        var result = (0, math_service_1.SMathOperations)(numA, numB, operation);
        if (result !== null) {
            (0, utils_1.logHistory)(operation, numA, numB, result);
            res.status(200).json((0, utils_1.formatResponse)(200, "Success", result));
            return;
        }
        else {
            res.status(400).json((0, utils_1.formatResponse)(400, "Division by zero not allowed"));
        }
    }
    catch (error) {
        res.status(400).json((0, utils_1.formatResponse)(400, error.message));
    }
};
exports.CMathOperations = CMathOperations;
var CMathHistory = function (req, res) {
    var historyFile = "history.json";
    var historyData = JSON.parse(fs_1.default.readFileSync(historyFile, "utf-8"));
    res.status(200).json((0, utils_1.formatResponse)(200, "Success", historyData));
};
exports.CMathHistory = CMathHistory;
var CMathDeleteByIndex = function (req, res) {
    var index = Number(req.params.index);
    var historyFile = "history.json";
    var historyData = JSON.parse(fs_1.default.readFileSync(historyFile, "utf-8"));
    historyData.splice(index, 1);
    fs_1.default.writeFileSync(historyFile, JSON.stringify(historyData));
    res.status(200).json((0, utils_1.formatResponse)(200, "Success", historyData));
};
exports.CMathDeleteByIndex = CMathDeleteByIndex;
//# sourceMappingURL=math.controller.js.map