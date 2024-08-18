import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../Model/Users.Model'

interface CustomRequest extends Request {
  username?: string
  userid?: string
}



const verifyJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // first we must check if token exist within the cookes if not than its save the lot of work

    // if it exist then we will inquriy 
    const refreshToken = req.cookies.jwt
    const { username } = req.body

    if (!refreshToken || !username) return res.status(401).json({ message: 'Unauthorized' })
    //so token exist then decoding the from user cookies 
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_2 as string
    ) as JwtPayload

    // i guess  we found a valid token .. then  let's call the daddy i mean database this mc exist in database

    const user = await User.findOne({ username })
    // if this dude dosnt esxit then of course kickout him or offer him mercy why dont re login or create and account my lord
    if (!user) return res.status(401).json({ message: 'User not found' })
    // then if lords havee user name but not enough credintial we will offer him relogin like a normal citizen 

    if (user._id.toString() !== decoded.userid)
      return res.status(401).json({ message: 'Invalid user' })

    if (user.refreshToken !== refreshToken)
      return res.status(401).json({ message: 'Invalid refresh token' })
    // if token and user name exxceed our item mind then we can assure them okay let them in 

    req.username = user.username
    req.userid = user._id.toString()

    next()
  } catch (error) {
    /**
     * i have a tony stark level plan to handle error , but they will say im a mad man :> 
     * 
     * i may use 
     */
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export default verifyJWT
