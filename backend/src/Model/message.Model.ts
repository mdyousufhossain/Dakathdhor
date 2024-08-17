import { model, Document, Types, Schema } from "mongoose";

// Define the interface for the Message model
interface IMessage extends Document {
    sender: Types.ObjectId; // User who sent the message
    receiver: Types.ObjectId; // User who received the message
    content: string; // The actual message content
    timestamp: Date; // The time when the message was sent
    read: boolean; // Whether the message has been read
    conversationId?: Types.ObjectId; // Optional, for grouping messages into conversations
}

// Define the schema
const MessageSchema = new Schema<IMessage>({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }, // Automatically set to the current date/time
    read: { type: Boolean, default: false }, // Default to unread
});

// Create and export the model
const Message = model<IMessage>('Message', MessageSchema);

export default Message;
