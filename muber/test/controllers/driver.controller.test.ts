import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';

import request from 'supertest';
import app from '../../src/app';
import Driver from '../../src/models/driver.model';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/muber_test');
});

beforeEach(async () => {
  await Driver.collection.drop();
  await Driver.ensureIndexes();
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

    expect(count).toEqual(0);
  });

  it('Get to /api/drivers finds drivers in a location', async () => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] },
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.2534507, 25.791581] },
    });

    await Promise.all([seattleDriver.save(), miamiDriver.save()]);

    const response = await request(app).get('/api/drivers?lng=-80&lat=25');

    expect(response.body.length).toEqual(1);
    expect(response!.body[0].email).toEqual('miami@test.com');
  });
});
