import express, { Request, Response } from "express";
import config from "config";
import logger from "./utils/logger";
import database from "./utils/database";
import routes from "./routes";
import deserializeUser from "./middlewares/deserializeUser";
import {
  restResponseTimeHistogram,
  startMetricsService,
} from "./utils/metrics";
import responseTime from "response-time";
import swaggerDocs from "./utils/swagger";
const port = config.get<number>("port");
const app = express();
app.use(express.json());
app.use(deserializeUser);
app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);
app.listen(port, async () => {
  logger.info("App is running at http://localhost:1337");
  await database();
  routes(app);
  startMetricsService();
  swaggerDocs(app, port);
});
