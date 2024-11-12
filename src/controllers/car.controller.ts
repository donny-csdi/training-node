import { Request, Response } from "express";
import SCar from "../services/car.service";
import { formatResponse } from "../utils";

const CGetAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await SCar.findAll();
    res.json(formatResponse(200, "Success", cars));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve cars" });
  }
};

const CGetCarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = await SCar.findById(id);
    if (!car) {
      res.status(404).json({ error: "Car not found" });
      return;
    }
    res.json(formatResponse(200, "Success", car));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve car" });
  }
};

const CCreateCar = async (req: Request, res: Response) => {
  try {
    const newCar = await SCar.create(req.body);
    res.json(formatResponse(201, "Success", newCar));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create car" });
  }
};

const CUpdateCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedCar = await SCar.update(id, req.body);
    if (!updatedCar) {
      res.status(404).json({ error: "Car not found" });
      return;
    }
    res.json(formatResponse(200, "Success", updatedCar));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update car" });
  }
};

const CDeleteCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCar = await SCar.remove(id);
    if (!deletedCar) {
      res.status(404).json({ error: "Car not found" });
      return;
    }
    res.json(formatResponse(200, "Success", deletedCar));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete car" });
  }
};

export { CGetAllCars, CGetCarById, CCreateCar, CUpdateCar, CDeleteCar };
