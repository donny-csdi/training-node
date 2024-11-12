import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import { checkHeader, errorHandler } from "./middlewares";
import loggerWinston from "./config/winston.config";
import loggerMoreAdvance from "./config/winston.config";
import cron from "node-cron";
import {
  initDynamicCronJobs,
  startJob,
  stopJob,
  updateJob,
} from "./services/cronJob.service";
import prisma from "./config/prismaClient.config";
import { formatResponse } from "./utils";
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

initDynamicCronJobs();

// Endpoint untuk menambah cron job baru
app.post("/api/jobs", async (req: Request, res: Response) => {
  const { jobName, cronTime } = req.body;
  const job = await prisma.cronJob.create({
    data: { jobName, cronTime, isActive: true },
  });
  startJob(job.id, jobName, cronTime);
  res.status(201).send(`Job ${jobName} created and started.`);
});

app.delete("/api/jobs/:id/stop", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json(formatResponse(400, "Bad Request"));
    return;
  }

  const jobExist = await prisma.cronJob.findUnique({
    where: {
      id: id,
    },
  });

  if (!jobExist) {
    res.status(400).json(formatResponse(400, "not found"));
  }

  stopJob(id);
  await prisma.cronJob.update({
    where: {
      id: id,
    },
    data: {
      isActive: false,
    },
  });

  res
    .status(200)
    .json(formatResponse(200, `Success stop the cron job : ${jobExist}`));
});

// Endpoint untuk memperbarui cron job yang ada
app.put("/api/jobs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cronTime } = req.body;
  await updateJob(id, cronTime);
  res.send(`Job with ID ${id} updated to new schedule.`);
});

// Endpoint untuk menghentikan job
app.delete("/api/jobs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  stopJob(id);
  await prisma.cronJob.update({
    where: { id },
    data: { isActive: false },
  });
  res.send(`Job with ID ${id} stopped.`);
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app bro listening at http://localhost:${port}`);
});
