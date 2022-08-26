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

describe('Creating records', () => {
  beforeEach(async () => {
    await User.collection.drop();
  });

  it('should save a new user', async () => {
    user = new User({ name: userName });
    await user.save();
    expect(!user.isNew).toEqual(true);
  });
});
