import cartsDAO from "./DAOs/cartsDAO/cartsDAO.js";
import { initMongo } from "./mongodb/dbConfig.js";
import logger from "../logger/winston.js"
import messagesDAO from "./DAOs/messagesDAO/messagesDAO.js";
import productsDAO from "./DAOs/productsDAO/productsDAO.js";
import ticketsDAO from "./DAOs/ticketsDAO/ticketDAO.js"
import usersDAO from "./DAOs/usersDAO/userDAO.js";

export default class Factory {
  static #instance;

  #cartsDAO;
  #messagesDAO;
  #productsDAO;
  #usersDAO;
  #ticketsDAO;

  constructor() {
    let argv = process.argv[2];

    switch (argv) {
      case "fs":
        this.#usersDAO = new usersDAO("fs");
        this.#productsDAO = new productsDAO("fs");
        this.#messagesDAO = new messagesDAO("fs");
        this.#cartsDAO = new cartsDAO("fs");
        this.#ticketsDAO = new ticketsDAO("fs");
        logger.info("class Factory  - args: " + argv);
        break;
      case "mongo":
        initMongo();
        this.#usersDAO = new usersDAO("mongo");
        this.#productsDAO = new productsDAO("mongo");
        this.#messagesDAO = new messagesDAO("mongo");
        this.#cartsDAO = new cartsDAO("mongo");
        this.#ticketsDAO = new ticketsDAO("mongo");
        logger.info("class Factory  - args: " + argv);
        break;
      case "memory":
        this.#usersDAO = new usersDAO("memory");
        this.#productsDAO = new productsDAO("memory");
        this.#messagesDAO = new messagesDAO("memory");
        this.#cartsDAO = new cartsDAO("memory");
        this.#ticketsDAO = new ticketsDAO("memory");
        logger.info("class Factory  - args: " + argv);
        break;
      case "sql":
        this.#usersDAO = new usersDAO("sql");
        this.#productsDAO = new productsDAO("sql");
        this.#messagesDAO = new messagesDAO("sql");
        this.#cartsDAO = new cartsDAO("sql");
        this.#ticketsDAO = new ticketsDAO("sql");
        logger.info("class Factory  - args: " + argv);
        break;
      default:
        initMongo();
        this.#usersDAO = new usersDAO("mongo");
        this.#productsDAO = new productsDAO("mongo");
        this.#messagesDAO = new messagesDAO("mongo");
        this.#cartsDAO = new cartsDAO("mongo");
        this.#ticketsDAO = new ticketsDAO("mongo");
        logger.info("class Factory  - Mongodb connected by default");
        break;
    }
  }

  static getInstance() {
    if (this.#instance) {
      logger.info("Factory instance in use !!!!");
      return this.#instance;
    } else {
      this.#instance = new Factory();
      console.log("Factory instance created");
      return this.#instance;
    }
  }

  getUserDAO = () => {
    return this.#usersDAO;
  }
  getMessagesDAO = () =>{
    return this.#messagesDAO;
  }
  getProductsDAO = () =>{
    return this.#productsDAO;
  }
  getCartsDAO = ()  => {
    return this.#cartsDAO;
  }
  getTicketsDAO = ()  => {
    return this.#ticketsDAO;
  }
}
