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
            required: true,
            default: 'Point',
        },
        coordinates: {
            type: [Number], // user must have location on
            required: true,
        },
    },
    isOnline: {
        type: Boolean,
        default: false, // it will depend if open by dafualt , user can turn off ..
    },
    refreshToken: {
        type: String
    }
});
// Add a 2dsphere index to the location field for geospatial queries. is this alien languages
userSchema.index({ location: '2dsphere' });
// Create a model.
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
