"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var iklan_controller_1 = require("../controllers/iklan.controller");
var router = (0, express_1.Router)();
router.get("/", iklan_controller_1.CGetAllIklans);
router.get("/:id", iklan_controller_1.CGetIklanById);
router.post("/", iklan_controller_1.CCreateIklan);
router.patch("/:id", iklan_controller_1.CUpdateIklan);
router.delete("/:id", iklan_controller_1.CDeleteIklan);
exports.default = router;
//# sourceMappingURL=iklan.routes.js.map