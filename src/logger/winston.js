import { __dirname } from "../utils.js";
import config from "../config.js";
import winston from "winston";

const customLevels = {
  names: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "magenta",
    error: "red",
    warning: "yellow",
    info: "cyan",
    http: "green",
    debug: "blue",
  },
};

let logger;

if (config.NODE_ENV === "development") {
  logger = winston.createLogger({
    levels: customLevels.names,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevels.colors }),
          winston.format.simple()
        ),
      }),
    ],
  });
} else {
  logger = winston.createLogger({
    levels: customLevels.names,
    transports: [
      new winston.transports.File({
        filename: "./src/logger/errors.log",
        level: "error",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.prettyPrint()
        ),
      }),
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevels.colors }),
          winston.format.simple()
        ),
      }),
    ],
  });
}

export default logger;

