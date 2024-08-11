import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Model/Users.Model';


/**
 * this is just demo version of the longway i will create an separted authentication method .. 
 * but for sake of progress i guess i will use this easy method 
 * lots of things will change 
 * @todo adding a deleteing method 
 * 
 * well deleting is account will be more peramoy than creating one yeah for sake of progress i will that later aswell ,
 */

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // i will add later 

// Register a new user
export const HandleRegisterUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // 
        const { username, password, latitude, longitude } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }
        const hasedPW = await bcrypt.hash(password, 10); // this can be better , for now its faaaine 

        const newUser = new User({
            username,
            password: hasedPW,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude],// these are coordination of maps both togethar we will locate the people
            },
            isOnline: true,
        });
 
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: { id: newUser._id, username: newUser.username } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};




// Login user
export const HandleloginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, latitude, longitude } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Update user location and set as online
        user.isOnline = true;
        user.location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Logout user
export const HandlelogoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;

        // Find user by ID and set as offline
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        user.isOnline = false;
        await user.save();

        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
