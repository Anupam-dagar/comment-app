import http from "http";
import { Server } from "socket.io";
import { UpvoteMessage } from "../models/upvote.model";

let io: Server;

const initialiseWebsocketServer = (server: http.Server) => {
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

const emitUpvoteComment = (message: UpvoteMessage) => {
  io.emit("comments", message);
};

export default {
  initialiseWebsocketServer,
  getWebsocketClient,
  emitUpvoteComment,
};
