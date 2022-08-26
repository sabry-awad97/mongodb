import { Types } from 'mongoose';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import database from '../src';
import User, { IUserDoc } from '../src/user';

let user: IUserDoc & {
  _id: Types.ObjectId;
};

const userName = 'John';

beforeAll(async () => {
  await database.connect('users_test');
});

afterAll(async () => {
  await database.disconnect();
});

beforeEach(async () => {
  await User.collection.drop();
});

describe('Creating records', () => {
  it('should save a new user', async () => {
    user = new User({ name: userName });
    expect(user.isNew).toEqual(true);
    await user.save();
    expect(user.isNew).toEqual(false);
  });
});
