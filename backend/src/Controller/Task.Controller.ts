import { Request, Response } from 'express'
import Task from '../Model/TaskGiver.model' // Adjust the path to your Task model
import mongoose from 'mongoose'
import User from '../Model/Users.Model'

/**
 *
 * @param req
 * @param res
 * @returns
 *
 * maybe i should create a separted type interface but i guess its wasy this way
 */

/**
 * i will use Transaction Seastion ongodb season you can get some idea from here
 * https://thecodebarbarian.com/a-node-js-perspective-on-mongodb-4-transactions.html
 *
 * its basically used on money transaction os sensetinve datamanagment its call atomiciy programming
 * basically if one fail all fail det's : https://en.wikipedia.org/wiki/Atomicity_(database_systems)
 */

interface TaskRequest extends Request {
  body: {
    taskGiver: mongoose.Types.ObjectId[]
    author: string
    type: string
    message: string
    media?: string[]
    location: string
    isSolved?: boolean
    batmans?: mongoose.Types.ObjectId[]
  }
}

export const HandleTaskCreate = async (
  req: TaskRequest,
  res: Response
): Promise<Response> => {
  /**
   * @todo handle media , we will try to store webp or png its less costly this way ,
   * so question is should we handle this on front end or in backend huh ?
   */
  // hehe introducing the atomic programming  inshort if one fail all fail
  /**
   * mongodb transcation might not the best choice but we can try if its not work effectivly we may need to build our own atomicy system which is easy dont worry just bunch of If else or swich just like Ai
   */

  try {
    const {
      type,
      message,
      media,
      isSolved,
      batmans,
      location,
      author,
    } = req.body

    // @ts-ignore
    const userId = req.userid // user._id ?

    console.log(userId) // check if user logged
    /**
     * nasa lvl validation lol
     */

    if (!userId) res.status(400).json({ error: 'no username found' })
    if (!author) res.status(400).json({ error: 'no author found' })

    if (!type) {
      return res.status(400).json({ error: 'Type required' })
    }

    if (!message || message.length < 10) {
      return res
        .status(400)
        .json({ error: 'Message is required / at least 10 characters long' })
    }

    if (!location) {
      return res.status(400).json({ error: 'Location is required' })
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    const newTask = new Task({
      taskGiver: userId,
      author,
      type,
      message,
      media,
      location,
      isSolved,
      batmans,
    })


    const savedTask = await newTask.save({ session })

    // Update the user's taskgiven array with the new task's ID
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $push: { taskgiven: savedTask._id },
    })

    // If the user update fails, throw an error to rollback the transaction
    if (!updatedUser) {
      throw new Error("User not found or task not saved in user's taskgiven")
    }

    // Commit the transaction if everything is successful
    await session.commitTransaction()

    session.endSession()

    return res.status(201).json(savedTask)
  } catch (error) {
    console.error('Error saving task:', error)
    return res.status(500).json({ error: 'Failed to save task' })
  }
}
