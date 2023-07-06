import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import { generateToken } from "../utils.js";
import logger from "../logger/winston.js"
import usersService from "../services/users.service.js";

export const loginJwtController = async (req, res, next) => {
  try {
    if (req.body === "") {
      logger.error("loginJwtController: req.body input parameter is missing")
      CustomError(
        ErrorsName.USER_DATA_ERROR,
        ErrorsCause.USER_DATA_ERROR,
        ErrorsMessage.USER_DATA_ERROR,
        500,
        "input data missing"
      );
    }

    const user = await usersService.loginUserService(req.body);
    if (user) {
      const token = generateToken(user);
      return res.cookie("token", token, { httpOnly: true }).json({ token });
    }
    logger.warning("loginJwtController: user not exist")
    CustomError(
      ErrorsName.USER_DATA_NO_EXIST,
      ErrorsCause.USER_DATA_NO_EXIST,
      ErrorsMessage.USER_DATA_NO_EXIST,
      500,
      "User not exist"
    );
  } catch (error) {
    logger.fatal("Error in loginJwtController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};
