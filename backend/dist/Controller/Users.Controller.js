"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlelogoutUser = exports.HandleloginUser = exports.HandleRegisterUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_Model_1 = __importDefault(require("../Model/Users.Model"));
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
const HandleRegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        const { username, password, latitude, longitude } = req.body;
        // Check if user already exists
        const existingUser = yield Users_Model_1.default.findOne({ username });
        if (existingUser) {
            res.status(409).json({ error: 'Username already exists' });
            return;
        }
        if (!username || !password) {
            res.status(400).json({ error: 'Please fill all the required fields' });
        }
        const hasedPW = yield bcryptjs_1.default.hash(password, 10); // this can be better , for now its faaaine
        const newUser = new Users_Model_1.default({
            username,
            password: hasedPW,
            // location: {
            //     type: 'Point',
            //     coordinates: [longitude, latitude],// these are coordination of maps both togethar we will locate the people
            // },
            isOnline: true,
        });
        yield newUser.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        res
            .status(201)
            .json({ token, user: { id: newUser._id, username: newUser.username } });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.HandleRegisterUser = HandleRegisterUser;
// Login user
const HandleloginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, latitude, longitude } = req.body;
        // Find user by username
        const user = yield Users_Model_1.default.findOne({ username });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Check password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
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
        yield user.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res
            .status(200)
            .json({ token, user: { id: user._id, username: user.username } });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.HandleloginUser = HandleloginUser;
// Logout user
const HandlelogoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        const { username } = req.body;
        // Find user by ID and set as offline
        const user = yield Users_Model_1.default.findById(username);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        user.isOnline = false;
        yield user.save();
        res.status(200).json({ message: 'User logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.HandlelogoutUser = HandlelogoutUser;
