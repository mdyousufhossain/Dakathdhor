import { Document, model, Schema, Types } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  message?: string; // This field should be optional if it's not always required
  location?: {      // Make location optional as well
    type: 'Point';  // Since you are using a 2dsphere index, 'Point' is the only allowed value
    coordinates: [number, number]; // Coordinates are an array of two numbers [longitude, latitude]
  };
  isOnline: boolean;
  refreshToken?: string; // Optional, since not all users may have a refresh token
  _id: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
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

const User = model<IUser>('User', userSchema)

export default User