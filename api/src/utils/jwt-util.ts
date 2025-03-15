import jwt from 'jsonwebtoken';

import env from '../env';

type EnvKey = keyof typeof env;

type PrivateKey = Extract<
  EnvKey,
  'ACCESS_TOKEN_PRIVATE_KEY' | 'REFRESH_TOKEN_PRIVATE_KEY'
>;
type PublicKey = Extract<
  EnvKey,
  'ACCESS_TOKEN_PUBLIC_KEY' | 'REFRESH_TOKEN_PUBLIC_KEY'
>;

export function signJwt(
  obj: object,
  keyName: PrivateKey,
  options?: jwt.SignOptions,
) {
  try {
    const signKey = Buffer.from(
      env[keyName].replace(/\\n/g, '\n'),
      'base64',
    ).toString('ascii');

    return jwt.sign(obj, signKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
  } catch (err) {
    console.log(err);

    throw new Error('Error in signJwt');
  }
}

export function verifyJwt<T>(
  token: string,
  keyName: PublicKey,
): {
  valid: boolean;
  expired: boolean;
  decoded: T | null;
} {
  const verifyKey = Buffer.from(
    env[keyName].replace(/\\n/g, '\n'),
    'base64',
  ).toString('ascii');

  try {
    const decoded = jwt.verify(token, verifyKey);

    return {
      valid: true,
      expired: false,
      decoded: decoded as unknown as T,
    };
  } catch (err) {
    console.log(err);
    const message = err instanceof Error ? err.message : 'Unknown error';

    return {
      valid: false,
      expired: message === 'jwt expired',
      decoded: null,
    };
  }
}
