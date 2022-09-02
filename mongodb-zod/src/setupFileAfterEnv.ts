import { client } from './db';
import { beforeAll, afterAll } from 'vitest';

beforeAll(async () => {
  await client.connect();
});

afterAll(async () => {
  await client.close();
});
