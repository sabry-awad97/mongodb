import request from 'supertest';
import { describe, it } from 'vitest';

import app from '../app';

describe('GET /api/v1', () => {
  it('responds with a json message', async () => {
    await request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏',
      });
  });
});
