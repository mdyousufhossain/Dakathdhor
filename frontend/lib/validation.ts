import * as z from 'zod';

export const RegisterSchema = z.object({
    username: z.string().min(4, 'Username must be larger than 4 characters').max(15, 'Username must be within 15 characters'),
    batman: z.boolean().default(false),
    mobile: z.string().optional(),
    email: z.string().email('Invalid email address').min(3, 'Email too short'),
    role: z.array(z.number()).optional(),
    bio: z.string().max(250,"Dont you think it's too much ? ").optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),  // Adjust the min length as needed
    avatar: z.string().optional(),
    location: z.string()
});


export const TaskSchema = z.object({
    author: z.string().min(5, 'Author is required'),
    type: z.string().min(1, 'Task type is required'),
    message: z.string().min(5, 'Message is required'),
    media: z.array(z.string()).optional(),
    location: z.string().min(4, 'Location is required'),
    isSolved: z.boolean().optional(),
    batmans: z.array(z.string()).optional(),
  });
