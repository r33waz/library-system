import "reflect-metadata";

import cluster from "cluster";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import os from "os";
import path from "path";
import AppDataSource from "./config/db.config";
import { csrfProtection, setCsrfCookie } from "./middleware/crsf.middleware";
import mainRouter from "./routes/mainRoute";
import "./utils/crons/overdueCheck.cron";
import redisClient from "./utils/redisClient";

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  os.cpus().forEach(() => cluster.fork());

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died, restarting...`);
    cluster.fork();
  });
} else {
  const startServer = async () => {
    try {
      await redisClient.connect();

      const app = express();

      app.use(
        helmet({
          crossOriginResourcePolicy: false,
          contentSecurityPolicy: false,
        })
      );

      app.use(cookieParser());
      app.use(setCsrfCookie);
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

      await AppDataSource.initialize();

      const port = process.env.PORT || 8080;
      app.listen(port, () =>
        console.log(`Worker ${process.pid} listening on port ${port}`)
      );
    } catch (error) {
      console.error("Startup failed:", error);
      process.exit(1);
    }
  };

  startServer();
}
