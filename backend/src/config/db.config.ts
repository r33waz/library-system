import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";

dotenv.config(); // Load .env variables

const isProduction = process.env.NODE_ENV === "production";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: !isProduction, // true in dev, false in prod
  logging: !isProduction, // true in dev, false in prod

  entities: [__dirname + "/../entities/*{.ts,.js}"],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  migrationsRun: isProduction, // automatically run migrations in prod if desired
});

export default AppDataSource;
