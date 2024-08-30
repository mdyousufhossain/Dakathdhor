"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Task_Controller_1 = require("../Controller/Task.Controller");
const router = express_1.default.Router();
router.post('/user/createtask', Task_Controller_1.HandleTaskCreate);
exports.default = router;
