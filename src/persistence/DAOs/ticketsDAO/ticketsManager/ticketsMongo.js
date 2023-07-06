import { ticketsModel } from "../../../mongodb/models/tickets.model.js"

export default class TicketsMongo {
  async getTicketsByUser(email) {
    try {
      const tickets = await ticketsModel.findOne({purchaser: email});
      return tickets;
    } catch (error) {
      console.log("Error: GetMessages", error);
    }
  }

  // Metodo que agrega un producto a la colección de productos almacenada en el archivo ubicado en la dirección
  // almacenada en el atributo path de la clase. El metodo recibe una instancia del objeto Product.
  async addPurchase(purchase) {
    // si el campo code no ha sido ingresado en ningun producto procedemos al alta en la colección
    try {
      const newPurchase = await ticketsModel.create(purchase);
      return newPurchase;
    } catch (error) {
      console.log("Error en el alta de la compra, Log detallado: ", error);
      return "MessageManagerADDPURCHASE-COD1";
    }
  }
}
