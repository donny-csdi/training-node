import { Router } from "express";
import {
  CMathDeleteByIndex,
  CMathHistory,
  CMathList,
  CMathOperations,
} from "../controllers/math.controller";

const router = Router();

router.get("/", CMathOperations);

router.get("/:valueA/:operation/:valueB", CMathOperations);

router.post("/", CMathOperations);

router.get("/history", CMathHistory);

router.delete("/history/:id", CMathDeleteByIndex);

router.get("/list", CMathList);

export default router;
