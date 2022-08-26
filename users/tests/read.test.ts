import { HydratedDocument } from 'mongoose';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import database from '../src';
import User, { IUser } from '../src/user';

let user: HydratedDocument<IUser>;

const userName = 'John';

beforeAll(async () => {
  await database.connect('users_test');
});

afterAll(async () => {
  await database.disconnect();
});

beforeEach(async () => {
  await User.collection.drop();
  user = new User({ name: userName });
  await user.save();
});

describe('Reading records', () => {
  it('should find records with a given name', async () => {
    const users = await User.find({ name: userName }).select('name');
    expect(users[0]._id).toEqual(user._id);
    expect(users[0]._id.toString()).toBe(user._id.toString());
  });

  it('should find record with a given id', async () => {
    const found = await User.findOne({ id: user._id });
    expect(found!.name).toEqual(user.name);
  });
});
