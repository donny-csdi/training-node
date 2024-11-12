"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = createError;
exports.formatResponse = formatResponse;
exports.logHistory = logHistory;
exports.readJSONFile = readJSONFile;
exports.writeJSONFile = writeJSONFile;
var fs_1 = __importDefault(require("fs"));
function formatResponse(status, message, data) {
    if (data === void 0) { data = null; }
    return {
        status: status,
        message: message,
        data: data,
    };
}
function logHistory(operation, numA, numB, result) {
    var history = {
        operation: operation,
        numA: numA,
        numB: numB,
        result: result,
        date: new Date(),
    };
    var historyFile = "history.json";
    if (!fs_1.default.existsSync(historyFile)) {
        fs_1.default.writeFileSync(historyFile, "[]");
    }
    else {
        var historyData = JSON.parse(fs_1.default.readFileSync(historyFile, "utf-8"));
        historyData.push(history);
        fs_1.default.writeFileSync(historyFile, JSON.stringify(historyData));
    }
}
function createError(message, statusCode) {
    var error = new Error(message);
    error.statusCode = statusCode;
    return error;
}
function readJSONFile(filepath) {
    try {
        var data = fs_1.default.readFileSync(filepath, "utf-8");
        return JSON.parse(data || "[]");
    }
    catch (error) {
        console.error("Failed to readt or parse file at ".concat(filepath, ":"), error);
        return [];
    }
}
function writeJSONFile(filepath, data) {
    try {
        fs_1.default.writeFileSync(filepath, JSON.stringify(data));
    }
    catch (error) {
        console.error("Failed to write file at ".concat(filepath, ":"), error);
    }
}
//# sourceMappingURL=index.js.map