import db, { ping } from './db';
import env from './env';
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

  const port = env.PORT;
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

void main();
