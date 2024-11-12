"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var promo_controller_1 = require("../controllers/promo.controller");
var router = (0, express_1.Router)();
router.get("/", promo_controller_1.CGetAllPromos);
router.get("/:id", promo_controller_1.CGetPromoById);
router.post("/", promo_controller_1.CCreatePromo);
router.patch("/:id", promo_controller_1.CUpdatePromo);
router.delete("/:id", promo_controller_1.CDeletePromo);
exports.default = router;
//# sourceMappingURL=promo.routes.js.map