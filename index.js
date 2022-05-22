import "dotenv/config";
import express from "express";
import { connectToDatabase } from "./utils/db.js";

const app = express();
const port = process.env.PORT;

connectToDatabase(() => {
  console.log("database connected.");
});
