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
    message: {
        type: String,
    },
    password: {
        type: String,
        required: true,
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
});
// Add a 2dsphere index to the location field for geospatial queries
userSchema.index({ location: '2dsphere' });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
