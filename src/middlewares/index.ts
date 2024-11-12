import { NextFunction, RequestHandler, Request, Response } from "express";
import { formatResponse } from "../utils";
import env from "../config/env.config";
import { verifyToken } from "../utils/jwt";
import loggerWinston from "../config/winston.config";

const checkHeader: RequestHandler = (req, res, next) => {
  const contentType = req.headers["content-type"];
  const apiKey = req.headers["apikey"];

  if (contentType !== "application/json") {
    res.status(400).json(formatResponse(400, "Invalid Content Type"));
    return;
  }

  if (apiKey !== env.API_KEY) {
    res.status(401).json(formatResponse(401, "Unauthorized"));
    return;
  }

  return next();
};

const loggingMiddleware = (req: Request, res: Response, next: Function) => {
  console.log(`${req.method}:${req.url}`);
  next();
};

const apikeyValidator: RequestHandler = (req, res, next) => {
  const { apikey } = req.headers;

  if (apikey !== env.API_KEY) {
    res.json(formatResponse(401, "API Key Not Valid", null));
    return;
  }
  return next();
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  loggerWinston.error(`${statusCode} - ${message} - Winston`);
  res.status(statusCode).json(formatResponse(statusCode, message, null));
};

const checkAuth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.json(formatResponse(401, "Unauthorized"));
    return;
  }

  try {
    const verify = verifyToken(token, env.ACCESS_TOKEN_SECRET);

    if (!verify) {
      if (verify === null) {
        res.status(403).json(formatResponse(403, "Token expired", null));
      } else {
        res.status(401).json(formatResponse(401, "Unauthorized", null));
      }
      return;
    }
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }

  return next();
};
export {
  checkHeader,
  loggingMiddleware,
  checkAuth,
  apikeyValidator,
  errorHandler,
};
