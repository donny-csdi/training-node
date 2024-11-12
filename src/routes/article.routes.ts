import { Router } from "express";
import {
  CCreateArticle,
  CCreateArticleWithTags,
  CDeleteArticle,
  CGetAllArticles,
  CGetArticleById,
  CUpdateArticle,
  CUpdateArticleWithTags,
} from "../controllers/article.controller";

const router = Router();

router.get("/", CGetAllArticles);
router.get("/:id", CGetArticleById);
router.post("/", CCreateArticle);
router.patch("/:id", CUpdateArticle);
router.delete("/:id", CDeleteArticle);
router.post("/tags", CCreateArticleWithTags);
router.patch("/:id/tags", CUpdateArticleWithTags);

export default router;
