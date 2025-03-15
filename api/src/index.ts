import db, { ping } from './db';
import env from './env';
import authRouter from './modules/auth/auth-router';
import usersRouter from './modules/users/users-router';
import createApp from './utils/create-app';

async function main() {
  const app = createApp();

  try {
    await ping(db);
    console.log('database connected');
  } catch (e) {
    console.log(e, 'ping failed');
    process.exit(1);
  }

  app.use('/api/users', usersRouter);
  app.use('/api/auth', authRouter);

  const port = env.PORT;
  const hostname = env.HOST;
  app.listen(port, hostname, () => {
    console.log(`Server is listening on http://${hostname}:${port}`);
  });
}

void main();
