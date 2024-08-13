"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_Controller_1 = require("../Controller/Users.Controller");
const router = express_1.default.Router();
// Member register handler
router.post('/user/login', (req, res) => {
    console.log('Login route hit'); // to test if its hitss brraa
    /**
     * we can have a test here in further dev we can even use ip and mac address to identify
     * for the users so user dont have relogin everytime , requesting from direcly to the server is bit costly
     * but we will have security issue so we will use some sorta caching server or trusted device spell :>
     *
     * im a man with mad idea lol
     */
    (0, Users_Controller_1.HandleloginUser)(req, res);
});
exports.default = router;
