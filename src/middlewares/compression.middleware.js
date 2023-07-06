import compression from "express-compression";
import config from "../config.js";
import logger from "../logger/winston.js";

export const typeCompression = (app) => {
  switch (config.COMPRESION) {
    case "bt":
      app.use(compression({ brotli: { enabled: true, zlib: {} } }));
      logger.info("Using compresion brotli");
      break;
    case "gzip":
      app.use(compression());
      logger.info("Using compresion gzip");
      break;
    case "none":
      logger.info("Using no compresion");
      break;
    default:
      logger.info("Using no compresion");
      break;
  }
};
