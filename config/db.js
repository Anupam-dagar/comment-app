import { DataSource } from "typeorm";
import env from "./env.js";

const dbConfig = new DataSource({
  type: "mysql",
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbName,
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});

export default dbConfig;
