import express from "express";
import client from "prom-client";
import logger from "./logger";
type DatabaseTimer = {
  timerSuccess: () => void;
  timerFailure: () => void;
};

const app = express();
export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_in_seconds",
  help: "API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});
export const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_in_seconds",
  help: "DATABASE response time in seconds",
  labelNames: ["operation", "success"],
});
export const startDatabaseTimer = (operation: string): DatabaseTimer => {
  const metricsLabel = { operation };
  const timer = databaseResponseTimeHistogram.startTimer();

  return {
    timerSuccess: () => timer({ ...metricsLabel, success: "true" }),
    timerFailure: () => timer({ ...metricsLabel, success: "false" }),
  };
};
export function startMetricsService() {
  const collectDefaulMetrics = client.collectDefaultMetrics;
  collectDefaulMetrics();
  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });
  app.listen(9100, () => {
    logger.info("Metrics server started at http://localhost:9100");
  });
}
