import config from '../../../config.js';
import messagesFileSystem from "./messagesManager/messagesFileSystem.js";
import messagesMemory from "./messagesManager/messagesMemory.js";
import messagesMongo from "./messagesManager/messagesFileSystem.js";
import messagesSQL from "./messagesManager/messagesSQL.js";

export default class MessagesDAO {
  
  #messagesDAO = null;

  constructor(argv) {
    switch (argv) {
      case "fs":
        const path = config.FILE_REPOSITORY;
        this.#messagesDAO = new messagesFileSystem(path + "messages.json");
        break;
      case "mongo":
        this.#messagesDAO = new messagesMongo();
        break;
      case "memory":
        this.#messagesDAO = new messagesMemory();
        break;
      case "sql":
        this.#messagesDAO = new messagesSQL();
        break;
      default:
        this.#messagesDAO = new messagesMongo();
        break;
    }
  }

  async getMessages() {
    return this.#messagesDAO.getMessages();
  }

  async addMessage(message) {
    return this.#messagesDAO.addMessage(message);
  }
}
