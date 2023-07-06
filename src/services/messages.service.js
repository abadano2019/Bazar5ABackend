import messagesRepository from "../repositories/messages.repository";

class MessagesServices {
  #respository;
  constructor(respository) {
    this.#drepository = respository;
  }

  getMessagesService = async () => {
    try {
      return await this.#respository.getMessagesRepository();
    } catch (error) {}
  };

  addMessageService = async (message) => {
    try {
      return await this.#respository.addMessageRepository(message);
    } catch (error) {}
  };
}

export default new MessagesServices(messagesRepository);
