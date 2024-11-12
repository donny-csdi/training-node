import { ScheduledTask } from "node-cron";
import cron from "node-cron";
import prisma from "../config/prismaClient.config";

interface JobTask {
  jobId: string;
  task: ScheduledTask;
}

const activeJobs: JobTask[] = [];

// Fungsi untuk memuat job dari database
const loadJobs = async () => {
  const jobs = await prisma.cronJob.findMany({ where: { isActive: true } });
  jobs.forEach((job) => startJob(job.id, job.jobName, job.cronTime));
};

// Fungsi untuk memulai atau menambah job baru
const startJob = (jobId: string, jobName: string, cronTime: string) => {
  const valid = cron.validate(cronTime);
  if (!valid) {
    throw new Error("Invalid cron time");
  }
  const task = cron.schedule(cronTime, () => {
    if (jobName === "emailDaily") {
      console.log("email daily");
    } else if (jobName === "backupWeekly") {
      console.log("backup weekly");
    } else if (jobName === "removeCaching") {
      console.log("remove caching");
    }
  });

  // Simpan ke daftar job aktif
  activeJobs.push({ jobId, task });
  console.log(`Started job ${jobName} with schedule ${cronTime}`);

  return {
    data: `Started job ${jobName} with schedule ${cronTime}`,
  };
};

// Fungsi untuk menghentikan dan menghapus job dari activeJobs
const stopJob = (jobId: string) => {
  const jobIndex = activeJobs.findIndex((job) => job.jobId === jobId);
  if (jobIndex !== -1) {
    activeJobs[jobIndex].task.stop();
    activeJobs.splice(jobIndex, 1);
    console.log(`Stopped job with ID ${jobId}`);
  }
};

// Fungsi untuk memperbarui job
const updateJob = async (jobId: string, newCronTime: string) => {
  stopJob(jobId); // Hentikan job lama
  const job = await prisma.cronJob.update({
    where: { id: jobId },
    data: { cronTime: newCronTime },
  });
  startJob(jobId, job.jobName, newCronTime); // Mulai job baru dengan jadwal yang diperbarui
};

// Muat dan mulai semua job saat aplikasi dijalankan
const initDynamicCronJobs = async () => {
  console.log("Loading and starting dynamic cron jobs...");
  await loadJobs();
};

export { initDynamicCronJobs, startJob, stopJob, updateJob };
