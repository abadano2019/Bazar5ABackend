import Factory from "../persistence/factory.js";
import logger from "../logger/winston.js";
import usersDTOPersistence from "../persistence/DTOs/users.DTO/userDTOPersistence.js";
import usersDTOResponse from "../persistence/DTOs/users.DTO/userDTOResponse.js";
import usersDTOResponseUsers from "../persistence/DTOs/users.DTO/userDTOResponseUsers.js";

class UsersRepository {
  #dao;
  constructor() {
    const factory = Factory.getInstance();
    const userDAO = factory.getUserDAO();
    this.#dao = userDAO;
  }

  getUserByIdRepository = async (email) => {
    try {
      const user = await this.#dao.getUserById(email);
      let userDTO = undefined;
      if (user) {
        userDTO = new usersDTOResponse(user);
      }
      return userDTO;
    } catch (error) {}
  };

  deleteUserRepository = async (email) => {
    try {
      const user = await this.#dao.deleteUser(email);
      let userDTO = undefined;
      if (user) {
        userDTO = new usersDTOResponse(user);
      }
      return userDTO;
    } catch (error) {}
  };

  getUsersRepository = async () => {
    try {
      const users = await this.#dao.getUsers();
      let usersDTO = [];
      let userDTO;
      users.forEach((user) => {
        userDTO = new usersDTOResponseUsers(user);
        usersDTO.push(userDTO);
      });

      return usersDTO;
    } catch (error) {}
  };

  createUserRepository = async (user, cart) => {
    try {
      console.log("user normal", user);
      const userDTO = new usersDTOPersistence(user, cart);
      const createdUser = await this.#dao.createUser(userDTO);
      return createdUser;
    } catch (error) {}
  };

  createUserPassportRepository = async (user, cart) => {
    try {
      console.log("user passport", user);
      const userDTO = new usersDTOPersistence(user, cart);
      console.log("USER DTO ", userDTO);
      const createdUser = await this.#dao.createUserPassport(userDTO);
      return createdUser;
    } catch (error) {}
  };

  loginUserRepository = async (user) => {
    try {
      const loginUser = await this.#dao.loginUser(user);
      let userDTO = undefined;
      if (loginUser) {
        userDTO = new usersDTOResponse(loginUser);
      }
      return userDTO;
    } catch (error) {}
  };

  updateUserTokenRepository = async (user, token) => {
    try {
      const userUpdated = await this.#dao.updateUserToken(user, token);
      console.log("usuario token", userUpdated);
      let userDTO = undefined;
      if (userUpdated) {
        console.log("Armando DTO del user");
        userDTO = new usersDTOResponse(userUpdated);
      }
      return userDTO;
    } catch (error) {
      console.log(error);
    }
  };

  updateUserPasswordRepository = async (user, password, token) => {
    try {
      console.log("entro en el repositorio", token);
      const userUpdated = await this.#dao.updateUserPassword(
        user,
        password,
        token
      );
      let userDTO = undefined;
      if (userUpdated) {
        userDTO = new usersDTOResponse(userUpdated);
      }
      return userDTO;
    } catch (error) {
      logger.fatal("Error in updateUserPasswordRepository, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  updateUserRoleRepository = async (user) => {
    try {
      const userUpdated = await this.#dao.updateUserRole(user);
      let userDTO = undefined;
      if (userUpdated) {
        userDTO = new usersDTOResponse(userUpdated);
      }
      return userDTO;
    } catch (error) {
      logger.fatal("Error in updateUserRoleRepository, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  userLogInOutRegistryRepository = async (uid, type, datetime) => {
    try {
      const userUpdated = await this.#dao.userLogInOutRegistry(
        uid,
        type,
        datetime
      );
      let userDTO = undefined;
      console.log("user UPDATED", userUpdated);
      if (userUpdated) {
        userDTO = new usersDTOResponse(userUpdated);
      }
      return userDTO;
    } catch (error) {
      logger.fatal(
        "Error in userLogInOutRegistryRepository, Log detail:",
        error
      );
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  setDocumentsRepository = async (uid, docs) => {
    try {
      const user = await this.#dao.setDocuments(uid, docs);
      let userDTO = undefined;
      if (user) {
        userDTO = new usersDTOResponse(user);
      }
      return userDTO;
    } catch (error) {
      logger.fatal("Error in setDocumentsRepository, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };
}
export default new UsersRepository();
