import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import logger from "../logger/winston.js";
import messagesServices from "../services/messages.service.js";

export const getMessagesController = async (req, res) => {
  try {
    const messages = await messagesServices.getMessagesService();
    logger.info("getMessagesController: messages finded");
    res.json(messages);
  } catch (error) {
    logger.fatal("Error in getMessagesController, Log detail:", error);
  }
};

export const addMessageController = async (info) => {
  const createMensaje = (info) => {
    try {
      // validación de los campos, se solicita que no sean vacios
      if (info.user === "") {
        logger.error("addMessageController: user parameter is missing");
        CustomError(
          ErrorsName.MESSAGE_CHAT_ERROR,
          ErrorsCause.MESSAGE_CHAT_ERROR,
          ErrorsMessage.MESSAGE_CHAT_ERROR,
          500,
          "Input parameter missing"
        );
        return "Atención: Verifique los campos a ingresar (user,mansage)";
      }

      if (info.message === "") {
        logger.error("addMessageController: message parameter is missing");
        CustomError(
          ErrorsName.MESSAGE_CHAT_ERROR,
          ErrorsCause.MESSAGE_CHAT_ERROR,
          ErrorsMessage.MESSAGE_CHAT_ERROR,
          500,
          "Input parameter missing"
        );
        return "Atención: Verifique los campos a ingresar (user,mansage)";
      }

      const chatMessage = {
        user: user,
        message: message,
      };
      return chatMessage;
    } catch (error) {
      logger.fatal("Error in addMessageController, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  try {
    menssage = createMensaje(info);
    if (menssage) {
      const newMessage = await messagesServices.addMessageService(message);
      logger.info("addMessageController: messages added", newMessage);
      return "Message Controller Add Message OK - COD2";
    } else {
      logger.warning("addMessageController: invalid messages");
    }
  } catch (error) {
    logger.fatal("Error in addMessageController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
  }
};
