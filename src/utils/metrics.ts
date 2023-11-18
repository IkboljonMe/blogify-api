import express from "express";
import client from "prom-client";
import logger from "./logger";

const app = express();

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
