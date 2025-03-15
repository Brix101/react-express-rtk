import { config } from 'dotenv';
import { z } from 'zod';

config();

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(5000),
  HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string().url(),
  ACCESS_TOKEN_PUBLIC_KEY: z.string(),
  ACCESS_TOKEN_PRIVATE_KEY: z.string(),
  REFRESH_TOKEN_PUBLIC_KEY: z.string(),
  REFRESH_TOKEN_PRIVATE_KEY: z.string(),
});

export type env = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error('❌ Invalid env:');
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-assertion
export default env!;
