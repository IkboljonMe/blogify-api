import dayjs from "dayjs";
import pino from "pino";
import pretty from "pino-pretty";
const stream = pretty({
  colorize: true,
  translateTime: `"Time⏳:"${dayjs().format("HH:mm:ss")}`,
});
const logger = pino(stream);
export default logger;
