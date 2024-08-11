import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
  username: string
  password: string
  message: string
  location: {
    type: string
    coordinates: [number, number]
  }
  isOnline: boolean
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
})

// Add a 2dsphere index to the location field for geospatial queries. is this alien languages
userSchema.index({ location: '2dsphere' })

// Create a model.
const User = model<IUser>('User', userSchema)

export default User
