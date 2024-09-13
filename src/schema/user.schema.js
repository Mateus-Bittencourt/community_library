import {z} from 'zod';

const userSchema = z.object({
  username: z.string().min(3, 'Username id required').max(30),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long').max(128),
  avatar: z.string().url('Invalid URL').optional()
})

const userIdSchema = z.object({
  userId: z.number().int().positive('User ID must be a positive number')
})


export { userSchema, userIdSchema }
