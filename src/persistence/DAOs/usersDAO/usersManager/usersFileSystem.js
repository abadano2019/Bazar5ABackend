import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../../../../error/errors.enum.js";
import { comparePasswords, hashPassword } from "../../../../utils.js";

import CustomError from "../../../../error/CustomError.js";
import UserDTOPersistence from "../../../DTOs/users.DTO/userDTOPersistence.js";
import logger from "../../../../logger/winston.js";
import { userModel } from "../../../mongodb/models/users.model.js";

export default class UserFileSystemManager {
  async getUserById(email) {
    try {
    } catch (error) {}
  }

  async deleteUser(email) {
    try {
    } catch (error) {}
  }

  async getUsers() {
    try {
    } catch (error) {}
  }

  createUserPassport = async (user) => {
    try {
    } catch (error) {}
  };

  createUser = async (user) => {
    try {
    } catch (error) {}
  };

  loginUser = async (user) => {
    try {
    } catch (error) {}
  };

  updateUserToken = async (email, token) => {
    try {
    } catch (error) {}
  };

  updateUserPassword = async (email, password, token) => {
    try {
    } catch (error) {}
  };

  updateUserRole = async (email) => {
    try {
    } catch (error) {}
  };

  userLogInOutRegistry = async (uid, type, datetime) => {
    try {
    } catch (error) {}
  };

  setDocuments = async (uid, docs) => {
    try {
    } catch (error) {}
  };
}
