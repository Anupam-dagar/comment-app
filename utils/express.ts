import express, { Express } from "express";
import logger from "morgan";
import router from "../routes";

const app: Express = express();
app.use(logger("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

export default app;
