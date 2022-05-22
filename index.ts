import "dotenv/config";
import "reflect-metadata";
import { connectToDatabase } from "./utils/db.js";
import app from "./utils/express";

const port = process.env.PORT;

connectToDatabase(() => {
  console.log("database connected.");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
