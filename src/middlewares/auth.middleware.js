import logger from "../logger/winston.js";
import productsServices from "../services/products.service.js";
import usersServices from "../services/users.service.js";

export const getAuthAdmin = function (req, res, next) {
  if (req.user) {
    if (token) {
      const user = usersServices.getUserByIdService(mail);
      const user_role = user.role;
      let allow = false;
      if (user_role == "admin") {
        allow = true;
      }

      if (allow) next();
      else {
        res.status(403).send({ error: "access denied" });
      }
    }
  } else {
    res.status(400).send({ error: "invalid token" });
  }
};

export const getAuthUser = async function (req, res, next) {
  if (req.user) {
    console.log(req.user.email);
    const user = await usersServices.getUserByIdService(req.user.email);
    console.log("usuario:", user);
    let user_role = user.role;
    console.log(user_role);
    let allow = false;
    if (user_role === "user") {
      allow = true;
    }
    if (allow) next();
    else {
      res.status(403).send({ error: "access denied" });
    }
  } else {
    res.status(400).send({ error: "invalid token" });
  }
};

export const getAuthUserSession = async function (req, res, next) {
  console.log("AUTH: ", req.session.email)
  if (req.session.email) {
    const user = await usersServices.getUserByIdService(req.session.email);
    const user_role = user.role;
    let allow = false;
    if (user_role === "user") {
      allow = true;
    }
    if (allow) {
      logger.info("getAuthUserSession: authorized access");
      next();
    } else {
      logger.info("getAuthUserSession: access denied");
      res.status(403).send({ error: "access denied" });
    }
  } else {
    logger.info("getAuthUserSession: access denied - unidentified user ");
    res.status(403).send({ error: "access denied - unidentified user" });
  }
};

export const getAuthAdminSession = async function (req, res, next) {
  if (req.session.email) {
    const user = await usersServices.getUserByIdService(req.session.email);
    const user_role = user.role;
    let allow = false;
    if (user_role === "admin") {
      allow = true;
    }
    if (allow) {
      logger.info("getAuthAdminSession: authorized access");
      next();
    } else {
      logger.info("getAuthAdminSession: access denied");
      res.status(403).send({ error: "access denied" });
    }
  } else {
    logger.info("getAuthAdminSession: access denied - unidentified user ");
    res.status(403).send({ error: "access denied - unidentified user" });
  }
};

export const getAuthPremiumSession = async function (req, res, next) {
  if (req.session.email) {
    const user = await usersServices.getUserByIdService(req.session.email);
    const user_role = user.role;
    let allow = false;
    if (user_role === "premium") {
      allow = true;
    }
    if (allow) {
      logger.info("getAuthPremiumSession: authorized access");
      next();
    } else {
      logger.info("getAuthPremiumSession: access denied");
      res.status(403).send({ error: "access denied" });
    }
  } else {
    logger.info("getAuthPremiumSession: access denied - unidentified user ");
    res.status(403).send({ error: "access denied - unidentified user" });
  }
};

export const getAuthAdminPremiumSession = async function (req, res, next) {
  if (req.session.email) {
    const user = await usersServices.getUserByIdService(req.session.email);
    const user_role = user.role;
    let allow = false;
    if ((user_role === "admin") || (user_role === "premium")){
      allow = true;
    }
    if (allow) {
      logger.info("getAuthAdminPremiumSession: authorized access");
      next();
    } else {
      logger.info("getAuthAdminPremiumSession: access denied");
      res.status(403).send({ error: "access denied" });
    }
  } else {
    logger.info("getAuthAdminPremiumSession: access denied - unidentified user ");
    res.status(403).send({ error: "access denied - unidentified user" });
  }
};
