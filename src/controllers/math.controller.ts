import { Request, Response } from "express";
import { SMathOperations } from "../services/math.service";
import { formatResponse, logHistory } from "../utils";
import fs from "fs";

const CMathList = (req: Request, res: Response) => {
  const dataList = ["Add", "Subtract", "Multiply", "Divide"];
  res.status(200).json(formatResponse(200, "Success", dataList));
};

const CMathOperations = (req: Request, res: Response) => {
  const { valueA, operation, valueB } =
    Object.keys(req.query).length !== 0
      ? req.query
      : Object.keys(req.params).length !== 0
      ? req.params
      : req.body;

  const numA = Number(valueA);
  const numB = Number(valueB);

  try {
    const result = SMathOperations(numA, numB, operation as string);

    if (result !== null) {
      logHistory(operation as string, numA, numB, result);
      res.status(200).json(formatResponse(200, "Success", result));
      return;
    } else {
      res.status(400).json(formatResponse(400, "Division by zero not allowed"));
    }
  } catch (error: any) {
    res.status(400).json(formatResponse(400, error.message));
  }
};

const CMathHistory = (req: Request, res: Response) => {
  const historyFile = "history.json";
  const historyData = JSON.parse(fs.readFileSync(historyFile, "utf-8"));
  res.status(200).json(formatResponse(200, "Success", historyData));
};

const CMathDeleteByIndex = (req: Request, res: Response) => {
  const index = Number(req.params.index);
  const historyFile = "history.json";
  const historyData = JSON.parse(fs.readFileSync(historyFile, "utf-8"));
  historyData.splice(index, 1);
  fs.writeFileSync(historyFile, JSON.stringify(historyData));
  res.status(200).json(formatResponse(200, "Success", historyData));
};

export { CMathList, CMathOperations, CMathHistory, CMathDeleteByIndex };
