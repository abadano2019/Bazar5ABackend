import logger from "../logger/winston.js";
import { transporter } from "../nodemailer.js";
import usersRepository from "../repositories/users.repository.js";

class UsersServices {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  // Devuleve un usuario por intermedio de su email
  getUserByIdService = async (email) => {
    try {
      const user = await this.#repository.getUserByIdRepository(email);
      return user;
    } catch (error) {}
  };

  // Devuelve todos los usuarios cargados en la base de datos
  getUsersService = async () => {
    try {
      const users = await this.#repository.getUsersRepository();
      return users;
    } catch (error) {}
  };

  // Creta un usuario y le asigna un carrito de camporas
  createUserService = async (user, cart) => {
    try {
      const createdUser = await this.#repository.createUserRepository(
        user,
        cart
      );
      return createdUser;
    } catch (error) {}
  };

  createUserPassportService = async (user, cart) => {
    try {
      const createdUser = await this.#repository.createUserPassportRepository(
        user,
        cart
      );
      console.log(createdUser);
      return createdUser;
    } catch (error) {}
  };

  loginUserService = async (user) => {
    try {
      const loginUser = await this.#repository.loginUserRepository(user);
      return loginUser;
    } catch (error) {}
  };

  updateUserTokenService = async (user, token) => {
    try {
      const userUpdated = await this.#repository.updateUserTokenRepository(
        user,
        token
      );
      return userUpdated;
    } catch (error) {
      console.log(error);
    }
  };

  updateUserPasswordService = async (user, password, token) => {
    try {
      const userUpdated = await this.#repository.updateUserPasswordRepository(
        user,
        password,
        token
      );

      return userUpdated;
    } catch (error) {
      logger.fatal("Error in updateUserPasswordService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  updateUserRoleService = async (user) => {
    try {
      const userUpdated = await this.#repository.updateUserRoleRepository(user);

      return userUpdated;
    } catch (error) {
      logger.fatal("Error in updateUserRoleService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  userLogInOutRegistryService = async (uid, type, datetime) => {
    try {
      const userUpdated = await this.#repository.userLogInOutRegistryRepository(
        uid,
        type,
        datetime
      );

      return userUpdated;
    } catch (error) {
      logger.fatal("Error in userLogInOutRegistryService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  setDocumentsService = async (uid, docs) => {
    try {
      logger.info("setDocumentsService, user email:", uid);
      logger.info("setDocumentsService, user docs:", docs);
      const user = await this.#repository.setDocumentsRepository(uid, docs);
      logger.info("setDocumentsService: set documentos OK");
      return user;
    } catch (error) {
      logger.fatal("Error in setDocumentsService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  validateDocumentsService = async (uid) => {
    try {
      logger.info("validateDocumentsService, user email:", uid);
      const email = uid;
      console.log("email", email);
      const user = await this.#repository.getUserByIdRepository(email);
      console.log("user:", user);
      const docs = user.docs;
      console.log(docs);
      if (docs.length == 0) {
        //if((docs[0]?.id_doc == "") || (docs[0]?.address == "") || (docs[0]?.edc == "") )
        logger.info("validateDocumentsService: some documents are missing");
        return false;
      } else {
        logger.info("validateDocumentsService: documents OK");
        return true;
      }
    } catch (error) {
      logger.fatal("Error in validateDocumentsService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  deleteUserService = async (email) => {
    try {
      const user = await this.#repository.deleteUserRepository(email);
      return user;
    } catch (error) {
      logger.fatal("Error in deleteUserService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  cleanUsersService = async () => {
    try {
      const users = await this.#repository.getUsersRepository();
      logger.info("USERS: ", users);
      await users.forEach(async (user) => {
        logger.info("cleanUsersService: Analising user: " + user.email);
        if (user.last_conection) {
          let date4;
          let flag = user.last_conection.substring(0, 6);
          if (flag === "Logout") {
            let str_split = user.last_conection.substring(
              7,
              user.last_conection.length
            );
            logger.info(str_split);
            let date = str_split.split("/");
            logger.info(date);
            let dia = date[0].trim();
            let mes = date[1].trim();
            let date2 = date[2].split(",");
            let ano = date2[0].trim();
            let date3 = date2[1].split(":");
            let hora = date3[0].trim();
            let min = date3[1].trim();
            let seg = date3[2].trim();

            logger.info(
              "day: " +
                dia +
                " month: " +
                mes +
                " year: " +
                ano +
                " houre: " +
                hora +
                " min: " +
                min +
                " sec: " +
                seg
            );
            date4 = new Date(ano, mes - 1, dia, hora, min, seg);
            logger.info(date4);

            let today = new Date();
            let difference = Math.abs(today - date4);
            logger.info("diffenrence: " + difference);
            let days = difference / (1000 * 3600 * 24);
            logger.info("days: " + days);
            if (days > 2) {
              await this.deleteUserService(user.email);
              logger.info("Deleted user: " + user.fullName);
              const mail = await transporter.sendMail({
                from: "BAZAR 5A",
                to: user.email,
                subject: "Usuario eliminado",
                text: `Estimado Usuario: Su cuenta ${user.email} correspondiente al sitio Bazar5A ha sido eliminada por inactividad`,
              });
              logger.info(`cleanUsersService: Sended mail to" ${user.email}`);
            } else {
              logger.info(" *** Active user *** : " + user.fullName);
            }
          }else{
            logger.info(" **** User in use **** : " + user.fullName);
          }
        } else {
          logger.info(` *** User: ${user.email} without connection ***`);
        }
      });
    } catch (error) {
      logger.fatal("Error in cleanUsersService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };
}

export default new UsersServices(usersRepository);
