"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var math_controller_1 = require("../controllers/math.controller");
var router = (0, express_1.Router)();
router.get("/", math_controller_1.CMathOperations);
router.get("/:valueA/:operation/:valueB", math_controller_1.CMathOperations);
router.post("/", math_controller_1.CMathOperations);
router.get("/history", math_controller_1.CMathHistory);
router.delete("/history/:id", math_controller_1.CMathDeleteByIndex);
router.get("/list", math_controller_1.CMathList);
exports.default = router;
//# sourceMappingURL=math.routes.js.map