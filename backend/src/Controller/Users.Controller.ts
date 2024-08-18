import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../Model/Users.Model'

/**
 * this is just demo version of the longway i will create an separted authentication method ..
 * but for sake of progress i guess i will use this easy method
 * lots of things will change
 * @todo adding a deleteing method
 * @todo there many error in the login and logout method i will try to solve isssue it iwll take times , this more than nagging nibbi girlfriend than i expected
 *
 * well deleting is account will be more peramoy than creating one yeah for sake of progress i will that later aswell ,
 */

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret' // i will add later

// Register a new user
export const HandleRegisterUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password, email, batman, avatar, mobile, location, bio } =
      req.body

    const userExists = await User.findOne({ $or: [{ username }, { email }] })

    if (userExists) {
      res.status(400).json({
        message:
          userExists.username === username
            ? 'Username is already taken'
            : 'Email is already in use',
      })
    }

    if (!username || !password) {
      res.status(400).json({ error: 'Please fill all the required fields' })
      return
    }

    const hashed = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      password: hashed,
      email,
      batman,
      avatar,
      mobile,
      location,
      bio,
    })

    const accessToken = jwt.sign(
      { userid: newUser._id, username: newUser.username },
      process.env.ACCESS_TOKEN_SECRET_1 as string,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { userid: newUser._id, username: newUser.username },
      process.env.REFRESH_TOKEN_SECRET_2 as string,
      { expiresIn: '1d' }
    )

    newUser.refreshToken = refreshToken
    await newUser.save()

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(201).json({
      username,
      accessToken,
      success: `New user ${username} created!`,
    })
  } catch (error) {
    console.error('Error in handleRegister:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Login user
export const HandleloginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password, email } = req.body

    if (!username || !password) {
      res.status(400).json({ message: 'Please add username or password' })
      return
    }

    const user = await User.findOne({ username })

    if (!user) {
      res
        .status(401)
        .json({ message: 'No registered account. Please create an account.' })
      return
    }

    if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
      res.status(401).json({
        message:
          'Account locked. Too many failed login attempts. Try again later.',
      })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      user.loginAttempts = 0
      user.accountLockedUntil = null // we will work on this later

      const accessToken = jwt.sign(
        { userid: user._id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET_1 as string,
        { expiresIn: '15m' }
      )

      const refreshToken = jwt.sign(
        { userid: user._id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET_2 as string,
        { expiresIn: '1d' }
      )

      user.refreshToken = refreshToken
      await user.save()

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })

      res.json({
        username,
        accessToken,
        success: `User logged in: ${username}`,
      })
    } else {
      user.loginAttempts++
      await user.save()

      if (user.loginAttempts >= 5) {
        user.accountLockedUntil = new Date(Date.now() + 15 * 60 * 1000)
        await user.save()

        res.status(401).json({
          message:
            'Account locked. Too many failed login attempts. Try again later.',
        })
        return
      }

      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    console.error('Error in loginHandler:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Logout user
export const HandlelogoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cookies = req.cookies
    if (!cookies?.jwt) {
      res.sendStatus(204) // No content
      return
    }

    const refreshToken = cookies.jwt
    const user = await User.findOne({ refreshToken })

    if (!user) {
      res.clearCookie('jwt', { httpOnly: true })
      res.sendStatus(204) // No content
      return
    }

    user.refreshToken = ''
    await user.save()

    res.clearCookie('jwt', { httpOnly: true })
    res.sendStatus(204) // No content
  } catch (error) {
    console.error('Error in handleLogout:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const handleCheckAvailityUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.query;

    const user = await User.findOne({ username });

    res.status(200).json({ available: !user }); // If user is null, it's available
  } catch (error) {
    console.log(error);
    res.status(500).json({ available: false, error: 'Server error' });
  }
};

export const handleCheckAvailityEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.query;

    const isEmail = await User.findOne({ email });

    res.status(200).json({ available: !isEmail }); // If isEmail is null, it's available
  } catch (error) {
    console.log(error);
    res.status(500).json({ available: false, error: 'Server error' });
  }
};

