import { model, Document, Types, Schema } from "mongoose";


/**
 * we can use this for both for normal comment on the post or the comment conversation 
 */


interface IComment extends Document {
    sender: Types.ObjectId; 
    receiver: Types.ObjectId; 
    content: string; 
    timestamp: Date; 
    read: boolean;
    topic?: Types.ObjectId; 
}

// Define the schema
const CommentSchema = new Schema<IComment>({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }, // Automatically set to the current date/time
    read: { type: Boolean, default: false }, // Default to unread
    topic: { type: Schema.Types.ObjectId, ref: 'Task', required: true }
});

// Create and export the model
const Comment = model<IComment>('Comment', CommentSchema);

export default Comment;
