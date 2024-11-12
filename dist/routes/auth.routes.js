"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var router = (0, express_1.Router)();
router.post("/login", auth_controller_1.CLogin);
router.post("/register", auth_controller_1.CRegister);
router.post("/refresh-token", auth_controller_1.CRefreshToken);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map