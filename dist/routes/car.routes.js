"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var car_controller_1 = require("../controllers/car.controller");
var router = (0, express_1.Router)();
router.get("/", car_controller_1.CGetAllCars);
router.get("/:id", car_controller_1.CGetCarById);
router.post("/", car_controller_1.CCreateCar);
router.patch("/:id", car_controller_1.CUpdateCar);
router.delete("/:id", car_controller_1.CDeleteCar);
exports.default = router;
//# sourceMappingURL=car.routes.js.map