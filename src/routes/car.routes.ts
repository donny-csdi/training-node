import { Router } from "express";
import {
  CGetAllCars,
  CGetCarById,
  CCreateCar,
  CUpdateCar,
  CDeleteCar,
} from "../controllers/car.controller";

const router = Router();

router.get("/", CGetAllCars);
router.get("/:id", CGetCarById);
router.post("/", CCreateCar);
router.patch("/:id", CUpdateCar);
router.delete("/:id", CDeleteCar);

export default router;
