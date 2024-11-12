import { Request, Response } from "express";
import { formatResponse } from "../utils";
import SArticle from "../services/article.service";
import redisClient from "../config/redis.config";
const CGetAllArticles = async (req: Request, res: Response) => {
  try {
    const articlesCache = await redisClient.getValue("articles");
    if (articlesCache) {
      console.log("from cache");

      res.json(formatResponse(200, "Success", JSON.parse(articlesCache)));
      return;
    }
    const articles = await SArticle.findAll();
    await redisClient.setValue("articles", JSON.stringify(articles));
    res.json(formatResponse(200, "Success", articles));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const CGetArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articles = await SArticle.findById(id);
    if (!articles) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", articles));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve articles" });
  }
};

const CCreateArticle = async (req: Request, res: Response) => {
  try {
    const newArticle = await SArticle.create(req.body);
    res.json(formatResponse(201, "Success", newArticle));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create article" });
  }
};

const CUpdateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedArticle = await SArticle.update(id, req.body);
    if (!updatedArticle) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", updatedArticle));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update article" });
  }
};

const CDeleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedArticle = await SArticle.remove(id);
    if (!deletedArticle) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", deletedArticle));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete article" });
  }
};

const CCreateArticleWithTags = async (req: Request, res: Response) => {
  const articleData = req.body.data;
  try {
    const newArticle = await SArticle.createWithTags(articleData);
    res.json(formatResponse(201, "Success", newArticle));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create article" });
  }
};

const CUpdateArticleWithTags = async (req: Request, res: Response) => {
  const { id } = req.params;
  const articleData = req.body.data;
  try {
    const updatedArticle = await SArticle.updateWithTags(id, articleData);
    res.json(formatResponse(200, "Success", updatedArticle));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update article" });
  }
};

export {
  CGetAllArticles,
  CGetArticleById,
  CCreateArticle,
  CUpdateArticle,
  CDeleteArticle,
  CCreateArticleWithTags,
  CUpdateArticleWithTags,
};
