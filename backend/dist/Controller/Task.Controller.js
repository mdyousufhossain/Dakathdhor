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
exports.HandleTaskCreate = void 0;
const TaskGiver_model_1 = __importDefault(require("../Model/TaskGiver.model")); // Adjust the path to your Task model
const mongoose_1 = __importDefault(require("mongoose"));
const Users_Model_1 = __importDefault(require("../Model/Users.Model"));
const HandleTaskCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @todo handle media , we will try to store webp or png its less costly this way ,
     * so question is should we handle this on front end or in backend huh ?
     */
    // hehe introducing the atomic programming  inshort if one fail all fail
    /**
     * mongodb transcation might not the best choice but we can try if its not work effectivly we may need to build our own atomicy system which is easy dont worry just bunch of If else or swich just like Ai
     */
    try {
        const { type, message, media, isSolved, batmans, location, author, } = req.body;
        // @ts-ignore
        const userId = req.userid; // user._id ?
        console.log(userId); // check if user logged
        /**
         * nasa lvl validation lol
         */
        if (!userId)
            res.status(400).json({ error: 'no username found' });
        if (!author)
            res.status(400).json({ error: 'no author found' });
        if (!type) {
            return res.status(400).json({ error: 'Type required' });
        }
        if (!message || message.length < 10) {
            return res
                .status(400)
                .json({ error: 'Message is required / at least 10 characters long' });
        }
        if (!location) {
            return res.status(400).json({ error: 'Location is required' });
        }
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const newTask = new TaskGiver_model_1.default({
            taskGiver: userId,
            author,
            type,
            message,
            media,
            location,
            isSolved,
            batmans,
        });
        const savedTask = yield newTask.save({ session });
        // Update the user's taskgiven array with the new task's ID
        const updatedUser = yield Users_Model_1.default.findByIdAndUpdate(userId, {
            $push: { taskgiven: savedTask._id },
        });
        // If the user update fails, throw an error to rollback the transaction
        if (!updatedUser) {
            throw new Error("User not found or task not saved in user's taskgiven");
        }
        // Commit the transaction if everything is successful
        yield session.commitTransaction();
        session.endSession();
        return res.status(201).json(savedTask);
    }
    catch (error) {
        console.error('Error saving task:', error);
        return res.status(500).json({ error: 'Failed to save task' });
    }
});
exports.HandleTaskCreate = HandleTaskCreate;
