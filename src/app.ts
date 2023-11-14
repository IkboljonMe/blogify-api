import express from "express";
import config from "config";
import logger from "./utils/logger";
import database from "./utils/database";
import routes from "./routes";
import deserializeUser from "./middlewares/deserializeUser";

const port = config.get<number>("port");
const app = express();
app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info("App is running at http://localhost:1337");
  await database();
  routes(app);
});
