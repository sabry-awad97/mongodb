import { Types } from 'mongoose';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import database from '../src';
import User, { IUserDoc } from '../src/user';

describe('User', () => {
  let user: IUserDoc & {
    _id: Types.ObjectId;
  };

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
      user = new User({ name: 'Joe' });
      await user.save();
      expect(!user.isNew).toEqual(true);
    });
  });

  describe('Reading records', () => {
    it('should find records with a given name', async () => {
      const users = await User.find({ name: 'Joe' }).select('name');
      expect(users[0]._id).toEqual(user._id);
    });
  });
});
