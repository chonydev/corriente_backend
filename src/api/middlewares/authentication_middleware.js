import jwt from 'jsonwebtoken'
import { verifyToken } from "../../utils/auth.js";

export default function authTokenMw(req, res, next) {
  //const authHeader = req.headers['authorization'];
  //const token = authHeader && authHeader.split(' ')[1];
  const token = req.headers.authorization.slice(7)    // 'Bearer ' added by postman in case of auth type Bearer Token
  /*
  console.log('\n from authTokenMw');
console.log(req.headers)
  */
  if (token == null) return res.sendStatus(401); // Unauthorized
  
  try {
    const result = verifyToken(token);
/*
console.log(result)
console.log(req.headers)
*/
   console.log('\n\n result headers')
   req.user = result
   console.log(req.user)
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: 'Invalid token' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

}
