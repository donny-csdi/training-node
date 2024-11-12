import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import { checkHeader, errorHandler } from "./middlewares";
import loggerWinston from "./config/winston.config";
import loggerMoreAdvance from "./config/winston.config";
// import logger from "morgan";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use((req: Request, res: Response, next: NextFunction) => {
  loggerMoreAdvance.info(`${req.method} - ${req.url} - Winston`);

  next();
});
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    loggerMoreAdvance.info(
      `${req.method} - ${req.originalUrl} - ${duration}ms - Winston`
    );
  });
  next();
});
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app bro listening at http://localhost:${port}`);
});
