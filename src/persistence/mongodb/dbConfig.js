import config from '../../config.js'
import logger from "../../logger/winston.js"
import mongoose from "mongoose";

const URI = config.MONGO_URI

/*export const initMongo = (uri) => {
    mongoose.connect(URI, (error)=>{
        if(error){
            logger.fatal('Error en conexión de base de datos', error)
        }
        else
        {
            logger.info('***** Base de datos conectada *****')
        }
    }) 
}*/

export const initMongo = (uri) => {
  mongoose
    .connect(URI)
    .then(() => logger.info("************Conectado a la base de datos*******************"))
    .catch((error) => console.log(error));
}