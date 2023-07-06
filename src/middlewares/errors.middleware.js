import logger from "../logger/winston.js"

export const errorMiddleware = (error,req,res,next)=>{
    logger.info("Ejecutando middleware de errores")
    res.send({
        status:error.name,
        message: error.message,
        cause: error.cause,
        number: error.Number,
    })
}