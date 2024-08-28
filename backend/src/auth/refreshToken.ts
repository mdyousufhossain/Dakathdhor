import { Request, Response } from 'express'
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken'
import User from '../Model/Users.Model'


/**
 * 
 * @param req user token from the datase
 * @param res response new access token 
 * @returns 
 * refresh token will refresh the login times its basically the tokenizer 
 */
const HandeRefreshToken = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const cookies = req.cookies

  if (!cookies?.jwt) {
    // user must have valid jwt cookies or will be forced to re-login
    return res.sendStatus(401)
  }

  const refreshToken = cookies.jwt

  try {
    const user = await User.findOne({ refreshToken }) // check if user has any valid refresh token

    if (!user) {
      return res.sendStatus(403) // Forbidden
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_2 as string,
      // @ts-ignore shalar hudai error or ami bujtasi na
      (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
        if (err || !decoded || user.username !== decoded.username) {
          return res.sendStatus(403) // Forbidden
        }

        const accessToken = jwt.sign(
          { userid: user._id, username: user.username },
          process.env.ACCESS_TOKEN_SECRET_1 as string,
          { expiresIn: '15m' }
        )

        return res.json({ accessToken })
      }
    )
  } catch (error) {
    console.error('Error in HandeRefreshToken:', error)
    return res.sendStatus(500) // Internal Server Error
  }
}

export default HandeRefreshToken
