import config from "config";
import logger from "./logger";
import mongoose from "mongoose";

async function database() {
  const db = config.get<string>("db");
  try {
    await mongoose.connect(db);
    logger.info("Database is connected succesfully✅");
  } catch (error) {
    logger.error(error, "Could not connect database");
  }
}
export default database;
