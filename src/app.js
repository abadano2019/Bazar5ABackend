import "./passport/passportStrategies.js";

import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../src/error/errors.enum.js";

import Cors from "cors";
import CustomError from "../src/error/CustomError.js";
import FileStore from "session-file-store";
import MessagesManager from "../src/persistence/DAOs/messagesDAO/messagesManager/messagesMongo.js";
import { Server } from "socket.io";
import { __dirname } from "../src/utils.js";
import cartsRouters from "./routes/carts.router.js";
import config from "./config.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "../src/middlewares/errors.middleware.js";
import express from "express";
import handlebars from "express-handlebars";
import jwtRouter from "./routes/jwt.router.js";
import logger from "../src/logger/winston.js";
import mongoStore from "connect-mongo";
import passport from "passport";
import paymentsRouters from "./routes/payments.router.js"
import productsRouters from "../src/routes/products.router.js";
import session from "express-session";
import { swaggerSetup } from "../src/docs/swaggerSpecs.js";
import swaggerUi from "swagger-ui-express";
import { typeCompression } from "../src/middlewares/compression.middleware.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";
import { winstonMiddleware } from "../src/middlewares/winston.middleware.js";

const PORT = config.PORT;
export const app = express();
const cookieKey = "signedCookieKey";
//const fileStore = FileStore(session)

typeCompression(app);
app.use(winstonMiddleware);
app.use(Cors());

app.use(cookieParser(cookieKey));

app.use(
  session({
    secret: "secretCoder23",
    resave: false,
    saveUninitialized: false,
    cookies:{
      maxAge:1000,
    },
    store: new mongoStore({
      mongoUrl: config.MONGO_URI,
    }),
    //cookie:{maxAge:1000}
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouters);
app.use("/api/carts", cartsRouters);
app.use("/views", viewsRouter);
app.use("/users", usersRouter);
app.use("/api/payments", paymentsRouters)
app.use("/jwt", jwtRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

// passport
//inicializar passport
app.use(passport.initialize());
// passport va a guardar la informacion de session
app.use(passport.session());

// archivos estaticos
app.use(express.static(__dirname + "/public"));
logger.info("__dirname: " + __dirname);

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(errorMiddleware);
const httpServer = app.listen(PORT, () => {
  logger.info("******** Ejecutando servidor **********");
  logger.info(`*** Escuchando al puerto:  ${PORT} ***`);
});

export const socketServer = new Server(httpServer);
const messagesManager = new MessagesManager();
socketServer.on("connection", (socket) => {
  logger.info(`Usuario conectado ${socket.id}`);

  socket.on("disconnect", () => {
    logger.info(`Usuario desconectado ${socket.id}`);
  });

  socket.on(
    "addProduct",
    async ({ title, description, price, code, stock, status, category }) => {
      logger.info("Se ejecutó la carga de un producto nuevo");
    }
  );

  socket.on("nuevoUsuario", (usuario) => {
    socket.broadcast.emit("broadcast", usuario);
  });

  socket.on("mensaje", async (info) => {
    const message = messagesManager.createMensaje(info.user, info.message);
    messagesManager.addMessage(message);
    const chats = await messagesManager.getMessages();
    socketServer.emit("chat", chats);
  });

  socket.on("nextPage", async (info) => {
    console.log("Recibo Next");
    /*const products = productsManager.createMensaje(info.user, info.message)
        messagesManager.addMessage(message)
        const chats = await messagesManager.getMessages()
        socketServer.emit('chat',chats)*/
  });
});
