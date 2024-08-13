"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    batman: {
        type: Boolean,
        required: true
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: [Number]
    },
    // taskgiven?:Schema.Types.ObjectId[],
    // taskCompleted?:Schema.Types.ObjectId[],
    // message?: Schema.Types.ObjectId[],
    bio: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number], // coordinates must be an array of numbers
        },
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    // Add loginAttempts field to track failed login attempts
    loginAttempts: {
        type: Number,
        default: 0,
    },
    // Add accountLockedUntil field to track lockout expiration time
    accountLockedUntil: {
        type: Date,
        default: null, // Indicates that the account is not locked
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
// Add a 2dsphere index to the location field for geospatial queries
userSchema.index({ location: '2dsphere' });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
