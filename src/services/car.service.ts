import { Car } from "@prisma/client";
import prisma from "../config/prismaClient.config";

const findAll = async () => {
  return prisma.car.findMany({
    include: {
      iklan: {
        select: {
          id: true,
          name: true,
          discount: true,
        },
      },
    },
  });
};

const findById = async (id: string) => {
  return prisma.car.findUnique({
    where: { id },
    include: {
      iklan: true,
    },
  });
};

const create = async (data: Omit<Car, "id">) => {
  return prisma.car.create({
    data,
  });
};

const update = async (id: string, data: Partial<Car>) => {
  return prisma.car.update({
    where: { id },
    data,
  });
};

const remove = async (id: string) => {
  return prisma.car.delete({
    where: { id },
  });
};

const SCar = {
  findAll,
  findById,
  create,
  update,
  remove,
};

export default SCar;
