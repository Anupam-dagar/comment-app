import express, { Express } from "express";
import logger from "morgan";
import router from "../routes";
import cors from "cors";
import http from "http";
import websocketServer from "../websocket/server";

const app: Express = express();
const server = http.createServer(app);
websocketServer.initialiseWebsocketServer(server);

app.use(cors());
app.use(logger("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

export default server;
