import { __dirname } from "../utils.js";
import swaggerJSDoc from "swagger-jsdoc"

const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'Documentation API adoptme',
        version: '1.0.0',
      },
    },
   apis: [`${__dirname}/docs/**/*.yaml`], // files containing annotations as above
  };

  export const swaggerSetup = swaggerJSDoc(swaggerOptions)