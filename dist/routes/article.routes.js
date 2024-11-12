"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var article_controller_1 = require("../controllers/article.controller");
var router = (0, express_1.Router)();
router.get("/", article_controller_1.CGetAllArticles);
router.get("/:id", article_controller_1.CGetArticleById);
router.post("/", article_controller_1.CCreateArticle);
router.patch("/:id", article_controller_1.CUpdateArticle);
router.delete("/:id", article_controller_1.CDeleteArticle);
router.post("/tags", article_controller_1.CCreateArticleWithTags);
router.patch("/:id/tags", article_controller_1.CUpdateArticleWithTags);
exports.default = router;
//# sourceMappingURL=article.routes.js.map