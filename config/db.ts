import { DataSource } from "typeorm";
import env from "./env";

const dbConfig = new DataSource({
  type: "mysql",
  host: env.dbHost,
  port: Number(env.dbPort),
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbName,
  synchronize: false,
  logging: true,
  entities: ["./dist/entities/*.js"],
  migrations: ["./dist/migrations/*.js"],
  subscribers: [],
});

export default dbConfig;
