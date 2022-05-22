import "dotenv/config";
import "reflect-metadata";
import express, { Express } from "express";
import { connectToDatabase } from "./utils/db.js";

const app: Express = express();
const port = process.env.PORT;

connectToDatabase(() => {
  console.log("database connected.");
});
