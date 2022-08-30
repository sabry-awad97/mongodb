import { describe, it, expect } from '../node_modules/vitest/dist/index';
import request from 'supertest';
import app from '../src/app';

describe('Express App', () => {
  it('should handle the request to /api', async () => {
    const response = await request(app).get('/api');
    expect(response.body).toMatchObject({ hello: 'world' });
    expect(response.status).toEqual(200);
  });
});
