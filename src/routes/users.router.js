import {
  changeUserRoleController,
  cleanUsersController,
  deleteUserController,
  getUsersController,
  logOutUserController,
  logOutUserExitController,
  loginUserController,
  resetPasswordController,
} from "../controllers/users.controller.js";
import {
  getAuthAdminPremiumSession,
  getAuthAdminSession,
  getAuthUserSession,
} from "../middlewares/auth.middleware.js";

import { Router } from "express";
import { forgotPasswordController } from "../controllers/users.controller.js";
import passport from "passport";

const router = Router();

router.get("/", getUsersController);

router.get("/users", (req, res) => {
  res.redirect("/views");
});

//registro con passport
/*router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/views/errorRegistro",
    successRedirect: "/views/products",
    passReqToCallback: true,
  },)
);*/

router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/views/errorRegistro",
    successRedirect: "/views/login",
    passReqToCallback: true,
  })
);

///////////////////////////////////////////
///////registro con passport gitHub////////
///////////////////////////////////////////
router.get(
  "/registroGithub",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github", passport.authenticate("github"), (req, res) => {
  req.session.email = req.user.email;
  req.session.user = req.user.fullName;
  if (
    req.user.role === "admin" ||
    req.user.role === "premium"
  ) {
    res.redirect("/views/menu");
  } else {
    res.redirect("/views/products");
  }
});

///////////////////////////////////////////
///////registro con passport google////////
///////////////////////////////////////////
router.get(
  "/registroGoogle",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google", passport.authenticate("google"), (req, res) => {
  req.session.email = req.user.email;
  req.session.user = req.user.fullName;
  if (
    req.user.role === "admin" ||
    req.user.role === "premium"
  ) {
    res.redirect("/views/menu");
  } else {
    res.redirect("/views/products");
  }
});

///////////////////////////////////////////
///////registro con passport discord///////
///////////////////////////////////////////

router.get("/discord", passport.authenticate("discord"));

router.get("/registroDiscord", passport.authenticate("discord"), (req, res) => {
  req.session.email = req.user.email;
  req.session.user = req.user.fullName;
  if (
    req.user.role === "admin" ||
    req.user.role === "premium"
  ) {
    res.redirect("/views/menu");
  } else {
    res.redirect("/views/products");
  }
});
////////////////////////////////////////////

router.post("/login", loginUserController);

router.get("/logout", logOutUserController);

router.post("/forgotPassword", forgotPasswordController);

router.post("/setNewPassword/:email/token/:token", resetPasswordController);

router.get("/premium/:email", changeUserRoleController);

router.post(
  "/deleteUser/:email",
  getAuthAdminPremiumSession,
  deleteUserController
);

router.delete("/", getAuthAdminPremiumSession, cleanUsersController);

export default router;
