import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";

import { Strategy as DiscordStrategy } from "passport-discord";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import cartsServices from "../services/carts.service.js";
import config from "../config.js";
import { hashPassword } from "../utils.js";
import logger from "../logger/winston.js"
import passport from "passport";
import { userModel } from "../persistence/mongodb/models/users.model.js";
import usersServices from "../services/users.service.js";

passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await usersServices.getUserByIdService(email);
      let rolUser = "user";
      logger.info("Passport registry: finded user", user)
      if (user) {
        req.session.email = user.email;
        return done(null, false);
      }
      if (email === "adminCoder@coder.com") {
        rolUser = "admin";
      }
      const hashNewPassword = await hashPassword(password);
      const cart = await cartsServices.addCartService();
      logger.info("created cart passport", cart)
      const newUser = { ...req.body, password: hashNewPassword, role: rolUser};
      const newuserDB = await usersServices.createUserPassportService(newUser, cart);
      req.session.email = newuserDB.email;
      req.session.user = newuserDB.fullName;
      done(null, newuserDB);
    }
  )
);

/////////////////////////////  GITHUB //////////////////////////////////////////////////////////
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: config.CLIENT_ID_GITHUB,
      clientSecret: config.CLIENT_SECRET_GITHUB,
      callbackURL: "http://localhost:3000/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      //const user = await userModel.findOne({email: profile._json.email})
      const user = await usersServices.getUserByIdService(profile._json.email);
      let role = "user";
      if (profile._json.email === "adminCoder@coder.com") {
        role = "admin";
      }
      if (!user) {
        const newUser = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email,
          password: "github",
          role: role,
        };
        const cart = cartsServices.addCartService();
        //const newuserDB = await userModel.create(newUser)
        const newuserDB = await usersServices.createUserService(newUser, cart);
        done(null, newuserDB);
      } else {
        
        done(null, user);
      }
    }
  )
);

///////////////////////////////// GOOGLE ////////////////////////////////////

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: config.CLIENT_ID_GOOGLE,
      clientSecret: config.CLIENT_SECRET_GOOGLE,
      callbackURL: "http://localhost:3000/users/google",
    },
    async (accessToken, refreshToken, profile, done) => {
      //const user = await userModel.findOne({email: profile._json.email})
      const user = await usersServices.getUserByIdService(profile._json.email);
      let role = "user";
      if (profile._json.email === "adminCoder@coder.com") {
        role = "admin";
      }
      if (!user) {
        const newUser = {
          first_name: profile._json.given_name,
          last_name: profile._json.family_name || " ",
          email: profile._json.email,
          password: "google",
          role: role,
        };
        const cart = cartsServices.addCartService();
        //const newuserDB = await userModel.create(newUser)
        const newuserDB = await usersServices.createUserService(newUser, cart);
        done(null, newuserDB);
      } else {
        done(null, user);
      }
    }
  )
);

///////////////////////////////// DISCORD ////////////////////////////////////

passport.use(
  "discord",
  new DiscordStrategy(
    {
      clientID: config.CLIENT_ID_DISCORD,
      clientSecret: config.CLIENT_SECRET_DISCORD,
      callbackURL: "/users/registroDiscord",
      scope: ["identify", "email", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      //const user = await userModel.findOne({email: profile.email})
      const user = await usersServices.getUserByIdService(profile.email);
      let role = "user";
      if (profile.email === "adminCoder@coder.com") {
        role = "admin";
      }
      if (!user) {
        const newUser = {
          first_name: profile.username,
          last_name: profile.username || " ",
          email: profile._json.email,
          password: "discord",
          role: role,
        };
        const cart = cartsServices.addCartService();
        const newuserDB = await usersServices.createUserService(newUser,cart);
        done(null, newuserDB);
      } else {
        done(null, user);
      }
    }
  )
);

///////////////////////////////////////////////////////////////////////////
// jwt Strategy
passport.use(
  "jwt",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretJWT",
    },
    async (jwt_payload, done) => {
      done(null, jwt_payload.user);
    }
  )
);

// jwt Strategy con cookies
const cookieExtractor = (req) => {
  const token = req.cookies.token;
  return token;
};

passport.use(
  "current",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: "secretJWT",
    },
    async (jwt_payload, done) => {
      console.log(jwt_payload.user);
      done(null, jwt_payload.user);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser(async (email, done) => {
  const user = await userModel.findById(email)
  console.log("email pasado:", email)
  //email = "abadano05@gmail.com"
  //const user = await usersServices.getUserByIdService(email);
  console.log("user", user)
  done(null, user);
});
