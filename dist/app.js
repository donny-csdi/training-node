"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var winston_config_1 = __importDefault(require("./config/winston.config"));
var node_cron_1 = __importDefault(require("node-cron"));
// import logger from "morgan";
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use(function (req, res, next) {
    winston_config_1.default.info("".concat(req.method, " - ").concat(req.url, " - Winston"));
    next();
});
app.use(function (req, res, next) {
    var start = Date.now();
    res.on("finish", function () {
        var duration = Date.now() - start;
        winston_config_1.default.info("".concat(req.method, " - ").concat(req.originalUrl, " - ").concat(duration, "ms - Winston"));
    });
    next();
});
app.use("/", routes_1.default);
node_cron_1.default.schedule("*/10 * * * * *", function () {
    console.log("jalan tiap 10");
});
node_cron_1.default.schedule("*/90 * * * * *", function () {
    console.log("jalan tiap 90");
});
app.listen(port, function () {
    console.log("Example app bro listening at http://localhost:".concat(port));
});
//# sourceMappingURL=app.js.map