import logger from "../logger/winston.js";

export const winstonMiddleware = (req, res, next) => {
  logger.info(
    `Method: ${req.method} - URL: ${req.url} - date: ${Date().toString()}`
  );
  next();
};
