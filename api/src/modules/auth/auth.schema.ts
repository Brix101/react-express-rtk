import { z } from 'zod';

export const signInUserSchema = z.object({
  email: z
    .string()
    .email()
    .transform((v) => v.toLowerCase()),
  password: z.string().min(8),
});

export type SignInUserInput = z.infer<typeof signInUserSchema>;

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
