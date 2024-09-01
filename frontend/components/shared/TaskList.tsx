'use client'

import React, { useEffect, useState } from 'react';
import { getAlltask } from '@/app/api/registration/api'; // Adjust the import path as needed
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TaskSchema } from '@/lib/validation';
import { z } from 'zod';
import Loader from '../cards/loader';

const TaskList = () => {
  const [tasks, setTasks] = useState<z.infer<typeof TaskSchema>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAlltask('/user/alltask', 'GET');
        setTasks(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load tasks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section className='w-4/5 flex justify-center items-start'>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
      {tasks.map((task, index) => (
        <Card key={index} className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{task.type}</CardTitle>
            <p className="text-sm text-gray-500">{task.author}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{task.message}</p>
            <p className="text-xs text-gray-400">Location: {task.location}</p>
            <p className="text-xs text-gray-400">
              Status: {task.isSolved ? 'Solved' : 'Unsolved'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
    </section>
  );
};

export default TaskList;
