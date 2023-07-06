import jwt from 'jsonwebtoken'
import logger from "../logger/winston.js"

export function jwtValidation(req, res, next) {
  // const authHeader = req.get('Authorization')
  // const token = authHeader.split(' ')[1]
  
  const token = req.cookies.token
  logger.info("Token:", token)
  const verifiedUser = jwt.verify(token, 'secretJWT')
  if (verifiedUser) {
    req.user = verifiedUser.user
    next()
  } else {
    logger.error("jwtValidation: JWT authentication error")
    res.json({ message: 'Authentication error' })
  }
}
