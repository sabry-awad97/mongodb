import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';

import request from 'supertest';
import app from '../../src/app';
import Driver from '../../src/models/driver.model';
import mongoose from 'mongoose';

beforeAll(async () => {
  mongoose.connect('mongodb://localhost/muber_test');
});

beforeEach(async () => {
  await Driver.collection.drop();
});

afterAll(async () => {
  mongoose.disconnect();
});

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', async () => {
    const count = await Driver.countDocuments();

    await request(app).post('/api/drivers').send({ email: 'test@test.com' });

    const newCount = await Driver.countDocuments();

    expect(count + 1).toEqual(newCount);
  });
});
