import Factory from "../persistence/factory.js";
import messageDTOPersistence from "../persistence/DTOs/messages.DTO/messageDTOPersistence.js";
import messageDTOResponse from "../persistence/DTOs/messages.DTO/messageDTOResponse.js";

class MessagesRepository {
  #dao;
  constructor() {
    const factory = Factory.getInstance();
    this.#dao = factory.getMessagesDAO();
  }

  getMessagesRepository = async () => {
    try {
      const message = await this.#dao.getMessages();
      const messageDTO = new messageDTOResponse(message);
      return messageDTO;
    } catch (error) {}
  };

  addMessageRepository = async (message) => {
    try {
      const messageDTO = new messageDTOPersistence(message);
      const newMessage = await this.#dao.addMessage(messageDTO);
      return newMessage;
    } catch (error) {}
  };
}

export default new MessagesRepository();
