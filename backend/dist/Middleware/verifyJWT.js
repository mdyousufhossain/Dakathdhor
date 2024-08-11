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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_Model_1 = __importDefault(require("../Model/Users.Model"));
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.jwt;
        const { username } = req.body;
        if (!refreshToken || !username) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_2);
        const user = yield Users_Model_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        if (user._id.toString() !== decoded.userid) {
            return res.status(401).json({ message: "Invalid user" });
        }
        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        req.username = user.username;
        req.userid = user._id.toString();
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
});
exports.default = verifyJWT;
