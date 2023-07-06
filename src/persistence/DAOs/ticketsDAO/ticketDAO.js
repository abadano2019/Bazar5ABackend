import ticketsFileSystem from "./ticketsManager/ticketsFileSystem.js";
import ticketsMemory from "./ticketsManager/ticketsMemory.js";
import ticketsMongo from "./ticketsManager/ticketsMongo.js";
import ticketsSQL from "./ticketsManager/ticketsSQL.js";

export default class TicketsDAO {
  #ticketsDAO;

  constructor(argv) {
    switch (argv) {
      case "fs":
        const path = "src/persistence/fileSystem/";
        this.#ticketsDAO = new ticketsFileSystem(path + "tickets.json");
        break;
      case "mongo":
        this.#ticketsDAO = new ticketsMongo();
        break;
      case "memory":
        this.#ticketsDAO = new ticketsMemory();
        break;
      case "sql":
        this.#ticketsDAO = new ticketsSQL();
        break;
      default:
        this.#ticketsDAO = new ticketsMongo();
        break;
    }
  }

  async getPurchaseByUser(email) {
    return this.#ticketsDAO.getPurchaseByUser(email);
  }

  async addPurchase(purchase) {
    return this.#ticketsDAO.addPurchase(purchase);
  }

}