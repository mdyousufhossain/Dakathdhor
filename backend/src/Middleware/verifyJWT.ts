import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../Model/Users.Model'

interface CustomRequest extends Request {
  username?: string
  userid?: string
}

/**
 * This will be the main middleware; the upper one is just for testing.
 */

const verifyJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.headers.authorization || req.headers.Authorization

  console.log('Authorization Header:', token)
  // @ts-ignore
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - no valid token' })
  }

  try {
    const decoded = jwt.verify(
      // @ts-ignore
      token.split(' ')[1],
      process.env.ACCESS_TOKEN_SECRET_1 as string
    ) as JwtPayload

    console.log('Decoded JWT:', decoded) // just for the debug

    req.username = decoded.username
    req.userid = decoded.userid
    next()
  } catch (error) {
    // @ts-ignore
    console.error('Error verifying token:', error.message)
    return res.status(403).json({ error: 'Invalid token' })
  }
}

export default verifyJWT
