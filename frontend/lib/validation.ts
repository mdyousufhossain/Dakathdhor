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
    type: z.array(z.string()).nonempty('Task type is required'),
    message: z.string(),
    media: z.array(z.string()).optional(), // Media is optional and can be an array of strings
    location: z.array(z.string()).nonempty('Location is required'),
    isSolved: z.boolean().default(false),
    // batmans: z.array(z.string().uuid()).optional(), // Batmans are optional and represented as an array of UUIDs
});
