import { Request, Response } from 'express';
import Task from '../Model/TaskGiver.model'; // Adjust the path to your Task model

export const getNearbyTasks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { latitude, longitude } = req.query; // Get coordinates from the query

    const tasks = await Task.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(longitude as string), parseFloat(latitude as string)], // Coordinates
            2 / 6378 // 2km radius in radians
          ]
        }
      }
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error finding tasks:', error);
    return res.status(500).json({ error: 'Failed to find tasks' });
  }
};
