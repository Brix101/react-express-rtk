import env from './env';
import createApp from './utils/create-app';

const port = env.PORT;
const app = createApp();

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
