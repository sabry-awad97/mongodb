import app from './app';
import { client } from './db';

const port = process.env.PORT || 5000;

client.connect().then(() => {
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
});
