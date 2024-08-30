"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema
const CommentSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }, // Automatically set to the current date/time
    read: { type: Boolean, default: false }, // Default to unread
    topic: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Task', required: true }
});
// Create and export the model
const Comment = (0, mongoose_1.model)('Comment', CommentSchema);
exports.default = Comment;
