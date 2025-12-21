import cluster from "cluster";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import os from "os";
import path from "path";
import "reflect-metadata";
import AppDataSource from "./config/db.config";
import { csrfProtection } from "./middleware/crsf.middleware";
import mainRouter from "./routes/mainRoute";
import "./utils/crons/overdueCheck.cron";
import redisClient from "./utils/redisClient";

// enable clustering ONLY in production
const isProd = process.env.NODE_ENV === "production";

if (isProd && cluster.isPrimary) {
  console.log(`Primary ${process.pid} running in PRODUCTION with clustering`);

  // one worker per CPU in prod
  os.cpus().forEach(() => cluster.fork());

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died, restarting...`);
    cluster.fork();
  });
} else {
  const startServer = async () => {
    try {
      await redisClient.connect();
      await AppDataSource.initialize();

      const app = express();

      app.use(
        helmet({
          crossOriginResourcePolicy: false,
          contentSecurityPolicy: false,
        })
      );

      app.use(cookieParser());
      app.use(csrfProtection);

      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(express.static(path.join(__dirname, "./image/uploads")));

      app.use(
        cors({
          origin: process.env.FRONTEND_URL || "http://localhost:3000",
          credentials: true,
          methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        })
      );

      app.use(mainRouter);

      const port = process.env.PORT || 8080;
      app.listen(port, () =>
        console.log(
          `Worker ${process.pid} running in ${
            isProd ? "PROD" : "DEV"
          } on port ${port}`
        )
      );
    } catch (error) {
      console.error("Startup failed:", error);
      process.exit(1);
    }
  };

  startServer();
}
