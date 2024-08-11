import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../Model/Users.Model';

interface CustomRequest extends Request {
    username?: string;
    userid?: string;

}



const verifyJWT = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const refreshToken = req.cookies.jwt;
        const { username } = req.body;

        if (!refreshToken || !username) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_2 as string) as JwtPayload;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user._id.toString() !== decoded.userid) {
            return res.status(401).json({ message: "Invalid user" });
        }

        if (user.refreshToken  !== refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        req.username = user.username;
        req.userid = user._id.toString();

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default verifyJWT;
