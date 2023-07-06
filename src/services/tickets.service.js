import ticketsRepository from "../repositories/tickets.repository.js";

class TicketsServices {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  getTicketByUserService = async (email) => {
    try {
      return await this.#repository.getTicketByUserRepository(email);
    } catch (error) {}
  };

  addTicketService = async (ticket) => {
    try {
      return await this.#repository.addTicketRepository(ticket);
    } catch (error) {}
  };
}

export default new TicketsServices(ticketsRepository);
