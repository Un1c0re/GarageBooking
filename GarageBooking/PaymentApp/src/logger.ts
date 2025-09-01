import dayjs from "dayjs";
import winston from "winston";

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      const time = timestamp as string;
      return `${dayjs(time).format("DD.MM.YYYY HH:mm:ss")} [${level}]: ${message}`;
    }),
  ),
  transports: [new winston.transports.Console()],
});
