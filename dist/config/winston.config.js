"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importStar(require("winston"));
var levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };
var colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};
winston_1.default.addColors(colors);
var logFormat = winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.format.colorize({ all: true }), winston_1.format.printf(function (info) { return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message); }));
var loggerTransports = [
    new winston_1.transports.Console(),
    new winston_1.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston_1.transports.File({ filename: "logs/all.log" }),
];
var loggerMoreAdvance = (0, winston_1.createLogger)({
    level: "debug",
    levels: levels,
    format: logFormat,
    transports: loggerTransports,
});
var loggerWinston = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: "error.log", level: "error" }),
        new winston_1.default.transports.File({ filename: "combined.log" }),
    ],
});
exports.default = loggerMoreAdvance;
//# sourceMappingURL=winston.config.js.map