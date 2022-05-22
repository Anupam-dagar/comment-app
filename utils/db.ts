import dbConfig from "../config/db";

export const connectToDatabase = async (callback: () => void) => {
  dbConfig
    .initialize()
    .then(callback)
    .catch((error) => {
      console.log(`Error connecting to database: ${error}`);
      process.exit(1);
    });
};
