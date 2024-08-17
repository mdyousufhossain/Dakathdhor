import { Request, Response } from 'express';
import Task from '../Model/TaskGiver.model'; // Adjust the path to your Task model
import getUserLocation from '../lib/getLocation';

export const HandleTaskCreate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userLocation = await getUserLocation();

    const { taskGiver, type, message, media, isSolved, batmans } = req.body;
    const location = `${userLocation.latitude},${userLocation.longitude}`;

    const newTask = new Task({
      taskGiver,
      type,
      message,
      media,
      location, // Save location as "latitude,longitude"
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
