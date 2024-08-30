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
exports.handleGetUser = exports.handleCheckAvailityEmail = exports.handleCheckAvailityUsername = exports.HandlelogoutUser = exports.HandleloginUser = exports.HandleRegisterUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_Model_1 = __importDefault(require("../Model/Users.Model"));
/**
 * this is just demo version of the longway i will create an separted authentication method ..
 * but for sake of progress i guess i will use this easy method
 * lots of things will change
 * @todo adding a deleteing method
 * @todo there many error in the login and logout method i will try to solve isssue it iwll take times , this more than nagging nibbi girlfriend than i expected
 *
 * well deleting is account will be more peramoy than creating one yeah for sake of progress i will that later aswell ,
 */
// Register a new user
const HandleRegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email, batman, avatar, mobile, location, bio } = req.body;
        const userExists = yield Users_Model_1.default.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            res.status(400).json({
                message: userExists.username === username
                    ? 'Username is already taken'
                    : 'Email is already in use',
            });
        }
        if (!username || !password) {
            res.status(400).json({ error: 'Please fill all the required fields' });
            return;
        }
        const hashed = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield Users_Model_1.default.create({
            username,
            password: hashed,
            email,
            batman,
            avatar,
            mobile,
            location,
            bio,
        });
        const accessToken = jsonwebtoken_1.default.sign({ userid: newUser._id, username: newUser.username }, process.env.ACCESS_TOKEN_SECRET_1, { expiresIn: '30m' });
        const refreshToken = jsonwebtoken_1.default.sign({ userid: newUser._id, username: newUser.username }, process.env.REFRESH_TOKEN_SECRET_2, { expiresIn: '7d' });
        newUser.refreshToken = refreshToken;
        yield newUser.save();
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            username,
            email,
            batman,
            avatar,
            mobile,
            location,
            bio,
            accessToken,
            success: `New user ${newUser} created!`,
        });
    }
    catch (error) {
        console.error('Error in handleRegister:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.HandleRegisterUser = HandleRegisterUser;
// Login user
const HandleloginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // we will use email later 
        const { username, password, email } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Please add username or password' });
            return;
        }
        const user = yield Users_Model_1.default.findOne({ username });
        if (!user) {
            res
                .status(401)
                .json({ message: 'No registered account. Please create an account.' });
            return;
        }
        if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
            res.status(401).json({
                message: 'Account locked. Too many failed login attempts. Try again later.',
            });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (isMatch) {
            user.loginAttempts = 0;
            user.accountLockedUntil = null; // we will work on this later
            const accessToken = jsonwebtoken_1.default.sign({ userid: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET_1, { expiresIn: '15m' });
            const refreshToken = jsonwebtoken_1.default.sign({ userid: user._id, username: user.username }, process.env.REFRESH_TOKEN_SECRET_2, { expiresIn: '1d' });
            user.refreshToken = refreshToken;
            yield user.save();
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({
                accessToken,
                user,
            });
        }
        else {
            user.loginAttempts++;
            yield user.save();
            if (user.loginAttempts >= 5) {
                user.accountLockedUntil = new Date(Date.now() + 15 * 60 * 1000);
                yield user.save();
                res.status(401).json({
                    message: 'Account locked. Too many failed login attempts. Try again later.',
                });
                return;
            }
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error('Error in loginHandler:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.HandleloginUser = HandleloginUser;
// Logout user
const HandlelogoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
            res.sendStatus(204); // No content
            return;
        }
        const refreshToken = cookies.jwt;
        const user = yield Users_Model_1.default.findOne({ refreshToken });
        if (!user) {
            res.clearCookie('jwt', { httpOnly: true });
            res.sendStatus(204); // No content
            return;
        }
        user.refreshToken = '';
        yield user.save();
        res.clearCookie('jwt', { httpOnly: true });
        res.sendStatus(204); // No content
    }
    catch (error) {
        console.error('Error in handleLogout:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.HandlelogoutUser = HandlelogoutUser;
const handleCheckAvailityUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        const user = yield Users_Model_1.default.findOne({ username });
        res.status(200).json({ available: !user }); // If user is null, it's available
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ available: false, error: 'Server error' });
    }
});
exports.handleCheckAvailityUsername = handleCheckAvailityUsername;
const handleCheckAvailityEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const isEmail = yield Users_Model_1.default.findOne({ email });
        res.status(200).json({ available: !isEmail }); // If isEmail is null, it's available
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ available: false, error: 'Server error' });
    }
});
exports.handleCheckAvailityEmail = handleCheckAvailityEmail;
const handleGetUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        const user = yield Users_Model_1.default.findOne({ username });
        res.status(200).json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ available: false, error: 'Server error' });
    }
});
exports.handleGetUser = handleGetUser;
