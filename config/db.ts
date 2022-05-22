import { DataSource } from "typeorm";
import { Comment } from "../entities/comments";
import { User } from "../entities/user";
import env from "./env";

const dbConfig = new DataSource({
  type: "mysql",
  host: env.dbHost,
  port: Number(env.dbPort),
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbName,
  synchronize: true,
  logging: false,
  entities: ["../entities/*.ts"],
  migrations: ["../migrations/*.ts"],
  subscribers: [],
});

export default dbConfig;
