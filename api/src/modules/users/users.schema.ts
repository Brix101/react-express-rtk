import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z
    .string()
    .email()
    .transform((v) => v.toLowerCase()),
  password: z.string().min(8),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
