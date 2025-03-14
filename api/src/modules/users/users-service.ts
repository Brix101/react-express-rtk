import argon2 from 'argon2';

import type { DB } from '../../db';
import type { CreateUserInput } from './users.schema';
import { usersTable } from '../../db/schema';

export async function createUser(db: DB, data: CreateUserInput) {
  try {
    const hashedPass = await argon2.hash(data.password);

    const payload = {
      ...data,
      email: data.email.toLowerCase(),
      password: hashedPass,
    };

    await db.insert(usersTable).values(payload);

    return {
      message: 'User created successfully',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    console.log('createUser: failed to create user', message);
    throw error;
  }
}
