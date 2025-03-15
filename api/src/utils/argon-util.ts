import argon2 from 'argon2';

export async function hashPassword(password: string) {
  try {
    return await argon2.hash(password);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    console.log('hashPassword: failed to hash password', message);
    throw error;
  }
}

export async function verifyPassword(
  password: string,
  candidatePassword: string,
) {
  try {
    return await argon2.verify(password, candidatePassword);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    console.log('verifyPassword: failed to verify password', message);
    throw error;
  }
}
