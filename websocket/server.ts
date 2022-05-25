import http from "http";
import { Server } from "socket.io";

let io: Server;

export const initialiseWebsocketServer = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
};

const getWebsocketClient = () => {
  return io;
};

export default {
  initialiseWebsocketServer,
  getWebsocketClient,
};
