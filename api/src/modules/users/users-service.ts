import { eq } from 'drizzle-orm';

import type { DB } from '../../db';
import type { User } from '../../db/schema';
import type { CreateUserInput } from './users.schema';
import { usersTable } from '../../db/schema';
import { hashPassword } from '../../utils/argon-util';

export async function createUser(db: DB, data: CreateUserInput) {
  try {
    const hashedPass = await hashPassword(data.password);

    const payload = {
      ...data,
      email: data.email.toLowerCase(),
      password: hashedPass,
    };

    const [result] = await db.insert(usersTable).values(payload);

    return result.insertId;
  } catch (error) {
    let message = 'Unknown error';

    if (error instanceof Error) {
      message = error.message;
      if (error.message.includes('users.users_email_unique')) {
        message = 'Email already exists';
      }
    }

    throw new Error(message);
  }
}

export async function getUserByEmail(db: DB, email: string) {
  try {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase()))
      .limit(1);

    return users.length ? users[0] : null;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    console.log('getUserByEmail: failed to get user', message);
    throw error;
  }
}

export async function getUserById(db: DB, id: User['id']) {
  try {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    return users.length ? users[0] : null;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    console.log('getUserById: failed to get user', message);
    throw error;
  }
}
