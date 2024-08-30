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
/**
 * This will be the main middleware; the upper one is just for testing.
 */
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization || req.headers.Authorization;
    console.log('Authorization Header:', token);
    // @ts-ignore
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - no valid token' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(
        // @ts-ignore
        token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET_1);
        console.log('Decoded JWT:', decoded); // just for the debug
        req.username = decoded.username;
        req.userid = decoded.userid;
        next();
    }
    catch (error) {
        // @ts-ignore
        console.error('Error verifying token:', error.message);
        return res.status(403).json({ error: 'Invalid token' });
    }
});
exports.default = verifyJWT;
