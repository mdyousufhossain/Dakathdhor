import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

export const connectionToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGO_URL) return console.log('missing url')
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: 'testdakath'
    })
    console.log('mongodb connected')
  } catch (error) {
    console.error(error)
  }
}
