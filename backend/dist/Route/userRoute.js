"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_Controller_1 = require("../Controller/Users.Controller");
const router = express_1.default.Router();
// Member register handler
router.get('/user/username', Users_Controller_1.handleCheckAvailityUsername);
router.get('/user/email', Users_Controller_1.handleCheckAvailityEmail);
router.post('/user/register', Users_Controller_1.HandleRegisterUser);
router.post('/user/login', Users_Controller_1.HandleloginUser);
router.post('/user/logout', Users_Controller_1.HandlelogoutUser);
exports.default = router;
