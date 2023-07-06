export default class UserDTOPersistence {
  constructor(user, cart) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.password = user.password;
    this.cart = cart._id;
    this.role = user.role;
    this.last_connection = user.last_connection
  }
}
