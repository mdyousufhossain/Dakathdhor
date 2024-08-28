import { Request, Response } from 'express';
import Task from '../Model/TaskGiver.model'; // Adjust the path to your Task model
import mongoose from 'mongoose';

/**
 * 
 * @param req 
 * @param res 
 * @returns
 * 
 * maybe i should create a separted type interface but i guess its wasy this way  
 */

interface TaskRequest extends Request {
  body: {
    taskGiver: mongoose.Types.ObjectId[];
    type: string;
    message: string;
    media?: string[];
    location: string;
    isSolved?: boolean;
    batmans?: mongoose.Types.ObjectId[];
  };
}


export const HandleTaskCreate = async (req: TaskRequest, res: Response): Promise<Response> => {

  /**
   * @todo handle media , we will try to store webp or png its less costly this way , 
   * so question is should we handle this on front end or in backend huh ? 
   */
  try {

    const { taskGiver, type, message, media, isSolved, batmans , location } = req.body;

    // these are for personal satisfiction i know , frontend will have validation and mongodb have validation and this is for my personal satisfiction i know this is low garbage code lol 
    
    if (!type) {
      return res.status(400).json({ error: 'Type required' });
    }

    if (!message || message.length < 10) {
      return res.status(400).json({ error: 'Message is required / at least 10 characters long' });
    }

    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }


    const newTask = new Task({
      taskGiver,
      type,
      message,
      media,
      location,
      isSolved,
      batmans
    });

    const savedTask = await newTask.save();
    
    return res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error saving task:', error);
    return res.status(500).json({ error: 'Failed to save task' });
  }
};
