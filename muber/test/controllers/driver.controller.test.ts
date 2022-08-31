import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import request from 'supertest';
import app from '../../src/app';
import Driver from '../../src/models/driver.model';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/muber_test');
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

  it('Post to /api/drivers requires an email', async () => {
    const response = await request(app).post('/api/drivers').send({});
    expect(response.status).toEqual(422);
  });

  it('Put to /api/drivers/id can update a record', async () => {
    const driver = new Driver({ email: 'test@example.com', driving: false });

    await driver.save();

    await request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({ driving: true });

    const found = await Driver.findOne({ email: 'test@example.com' });
    expect(found).not.toBeNull();
    expect(found!.driving).toEqual(true);
  });

  it('Delete to /api/drivers/:id can delete a record', async () => {
    const driver = new Driver({ email: 'example@test.com' });

    await driver.save();

    await request(app).delete(`/api/drivers/${driver._id}`);

    const count = await Driver.countDocuments();

    expect(count).toEqual(2);
  });
});
