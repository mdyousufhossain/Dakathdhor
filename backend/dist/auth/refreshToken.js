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
/**
 *
 * @param req user token from the datase
 * @param res response new access token
 * @returns
 * refresh token will refresh the login times its basically the tokenizer
 */
const HandeRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        // user must have valid jwt cookies or will be forced to re-login
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    try {
        const user = yield Users_Model_1.default.findOne({ refreshToken }); // check if user has any valid refresh token
        if (!user) {
            return res.sendStatus(403); // Forbidden
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_2, 
        // @ts-ignore shalar hudai error or ami bujtasi na
        (err, decoded) => {
            if (err || !decoded || user.username !== decoded.username) {
                return res.sendStatus(403); // Forbidden
            }
            const accessToken = jsonwebtoken_1.default.sign({ userid: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET_1, { expiresIn: '15m' });
            return res.json({ accessToken });
        });
    }
    catch (error) {
        console.error('Error in HandeRefreshToken:', error);
        return res.sendStatus(500); // Internal Server Error
    }
});
exports.default = HandeRefreshToken;
