import Factory from "../persistence/factory.js";
import ticketDTOPersistence from "../persistence/DTOs/tickets.DTO/ticketDTOPersistence.js";
import ticketDTOResponse from "../persistence/DTOs/tickets.DTO/ticketDTOResponse.js";

class TicketsRepository {
  #dao;
  constructor() {
    const factory = Factory.getInstance();
    this.#dao = factory.getTicketsDAO();
  }

  getTicketByUserRepository = async (email) => {
    try {
      const ticket = await this.#dao.getTicketByUser(email);
      let ticketDTO = undefined;
      if (ticket) {
        ticketDTO = new ticketDTOResponse(ticket);
      }
      return ticketDTO;
    } catch (error) {}
  };

  addTicketRepository = async (ticket) => {
    try {
      const messageDTO = new ticketDTOPersistence(ticket);
      const newTicket = await this.#dao.addPurchase(messageDTO);
      return newTicket;
    } catch (error) {}
  };
}

export default new TicketsRepository();
