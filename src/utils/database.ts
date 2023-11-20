import logger from "./logger";
import mongoose from "mongoose";

async function database() {
  const db = process.env.NODE_ENV_DB ?? "";
  try {
    await mongoose.connect(db);
    logger.info("Database is connected succesfully✅");
  } catch (error) {
    logger.error(error, "Could not connect database❌");
  }
}
export default database;
