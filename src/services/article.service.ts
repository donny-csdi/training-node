import { Article } from "@prisma/client";
import prisma from "../config/prismaClient.config";

const findAll = async () => {
  return prisma.article.findMany({
    include: {
      promo: true,
      articleTags: {
        include: {
          tag: true,
        },
      },
    },
  });
};

const findById = async (id: string) => {
  return prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      articleTags: {
        include: {
          tag: true,
        },
      },
    },
  });
};

const create = async (data: Omit<Article, "id">) => {
  return prisma.article.create({
    data,
  });
};

const update = async (id: string, data: Partial<Article>) => {
  return prisma.article.update({
    where: { id },
    data,
  });
};

const remove = async (id: string) => {
  return prisma.article.delete({
    where: { id },
  });
};

type ArticleCreateData = Article & { tagIds?: string[] };
const createWithTags = async (data: Omit<ArticleCreateData, "id">) => {
  const { tagIds, ...restData } = data;
  return prisma.article.create({
    data: {
      ...restData,
      articleTags: {
        create: tagIds
          ? tagIds.map((tagId) => ({
              tag: { connect: { id: tagId } },
            }))
          : [],
      },
    },
  });
};

type ArticleUpdateData = Partial<Article> & { tagIds?: string[] };
const updateWithTags = async (id: string, data: Partial<ArticleUpdateData>) => {
  const { tagIds, ...restData } = data;

  if (tagIds) {
    await prisma.articleTag.deleteMany({
      where: {
        articleId: id,
      },
    });

    await prisma.articleTag.createMany({
      data: tagIds.map((tagId) => ({
        articleId: id,
        tagId,
      })),
    });
  }

  return prisma.article.update({
    where: { id },
    data: restData,
  });
};

const SArticle = {
  findAll,
  findById,
  create,
  update,
  remove,
  createWithTags,
  updateWithTags,
};

export default SArticle;
