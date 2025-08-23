import { z } from "zod";

export const userSchema = z.object({
  user_id: z.string().optional(),
  user_name: z.string().optional(),
  user_email: z.email(),
  user_password: z.string(),
});

export type User = z.infer<typeof userSchema>;
