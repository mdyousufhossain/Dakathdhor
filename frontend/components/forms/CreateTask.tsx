'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TaskSchema } from '@/lib/validation'; // Adjust the import path as necessary
import Loader from '../cards/loader';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthContext';
import { createTask } from '@/app/api/registration/api';
import { createTask as CreateTaskType } from '@/type'; // Adjust the import path if necessary

function CreateTaskForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(''); // State to store location
  const [customLocation, setCustomLocation] = useState(false); // State to toggle custom location
  const router = useRouter();
  const { user } = useAuth(); // Ensure useAuth provides the user object

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      author: user?.items?.username || 'anonymous', // Ensure user is available, otherwise use a fallback
      type: '',
      message: '',
      media: [],
      location: '',
      isSolved: false,
      batmans: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof TaskSchema>) => {
    console.log('Submit button clicked');
    setIsLoading(true);
    console.log('Submitting form with values:', values); // Log the form values for debugging
    try {
      // Use the selected location or the manually entered one
      const finalValues = { ...values, location };
      const response = await createTask(finalValues as CreateTaskType); // Cast values to correct type
      console.log('Task created successfully:', response); // Log success response
      router.push('/dashboard'); // Redirect on success
    } catch (error) {
      console.error('Failed to create task:', error); // Log error
      router.push('/profile'); // Redirect to profile on error
    } finally {
      setIsLoading(false); // Reset loading state
      console.log('Finished task submission'); // Log completion
    }
  };

  const onInvalid = (errors: any) => {
    console.error('Form validation failed:', errors);
  };

  // Function to get the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        },{
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-center mb-4">Create a Task</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={isLoading}
                      className="text-sm block w-full p-2 border rounded-md"
                    >
                      <option value="">Select a task type</option>
                      {/* Add other options here */}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Message</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Task message"
                      {...field}
                      disabled={isLoading}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Location</FormLabel>
                  <FormControl>
                    <div className="flex space-x-2">
                      {customLocation ? (
                        <Input
                          {...field}
                          placeholder="Enter custom location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          disabled={isLoading}
                          className="text-sm flex-1"
                        />
                      ) : (
                        <Input
                          {...field}
                          value={location}
                          disabled
                          placeholder="Fetching location..."
                          className="text-sm flex-1"
                        />
                      )}
                      <Button
                        type="button"
                        onClick={getLocation}
                        disabled={isLoading || customLocation}
                        className="text-sm"
                      >
                        Get Location
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setCustomLocation(!customLocation)}
                        disabled={isLoading}
                        className="text-sm"
                      >
                        {customLocation ? 'Use Auto Location' : 'Custom Location'}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader /> : 'Create Task'}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateTaskForm;
