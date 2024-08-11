"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_Controller_1 = require("../Controller/Users.Controller");
const router = express_1.default.Router();
// Member register handler
router.post('/user/register', (req, res) => (0, Users_Controller_1.HandleRegisterUser)(req, res));
exports.default = router;
