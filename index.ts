import "dotenv/config";
import "reflect-metadata";
import { connectToDatabase } from "./utils/db.js";
import server from "./utils/express";

const port = process.env.PORT;

connectToDatabase(() => {
  console.log("database connected.");
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
