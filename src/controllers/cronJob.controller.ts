import { initDynamicCronJobs } from "../services/cronJob.service";

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
