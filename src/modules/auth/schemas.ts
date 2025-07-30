import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(5),
})

export type LoginInput = z.infer<typeof loginSchema>;