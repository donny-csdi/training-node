"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tag_controller_1 = require("../controllers/tag.controller");
var router = (0, express_1.Router)();
router.get("/", tag_controller_1.CGetAllTags);
router.get("/:id", tag_controller_1.CGetTagById);
router.post("/", tag_controller_1.CCreateTag);
router.patch("/:id", tag_controller_1.CUpdateTag);
router.delete("/:id", tag_controller_1.CDeleteTag);
exports.default = router;
//# sourceMappingURL=tag.routes.js.map