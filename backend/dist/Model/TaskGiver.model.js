"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    taskGiver: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }],
    author: [{ type: String, required: true }],
    type: [{ type: String, required: true }],
    message: { type: String, required: true, minlength: 10, maxlength: 255 },
    media: [{ type: String }], // Defaulting to an array to allow for future extensions 
    location: [{ type: String, required: true }],
    isSolved: { type: Boolean, default: false },
    batmans: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment' }]
});
// Create a model
const Task = (0, mongoose_1.model)('Task', TaskSchema);
exports.default = Task;
