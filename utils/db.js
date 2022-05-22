import dbConfig from "../config/db.js";

export const connectToDatabase = async (callback) => {
  dbConfig
    .initialize()
    .then(callback)
    .catch((error) => {
      console.log(`Error connecting to database: ${error}`);
      process.exit(1);
    });
};
