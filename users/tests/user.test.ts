import { Types } from 'mongoose';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import database from '../src';
import User, { IUserDoc } from '../src/user';

describe('User', () => {
  let user: IUserDoc & {
    _id: Types.ObjectId;
  };

  const username = 'Joe';

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
      user = new User({ name: username });
      await user.save();
      expect(!user.isNew).toEqual(true);
    });
  });

  describe('Reading records', () => {
    it('should find records with a given name', async () => {
      const users = await User.find({ name: username }).select('name');
      expect(users[0]._id).toEqual(user._id);
      expect(users[0]._id.toString()).toBe(user._id.toString());
    });

    it('should find record with a given id', async () => {
      const found = await User.findOne({ id: user._id });
      expect(found!.name).toEqual(user.name);
    });
  });

  describe('Deleting records', () => {
    beforeEach(async () => {
      await User.collection.drop();
      user = new User({ name: username });
      await user.save();
    });

    it('should remove record from the database using model instance method **remove**', async () => {
      await user.remove();
      const count = await User.countDocuments({ _id: user._id });
      expect(count).toBe(0);
    });

    it('should remove record from the database using class method **remove**', async () => {
      await User.remove({ _id: user._id });
      const doesUserExit = await User.findOne({ _id: user._id })
        .select('_id')
        .lean(/* the documents are returned as plain objects */)
        .then(doc => !!doc);

      expect(doesUserExit).toBeFalsy();
    });

    it('should remove record from the database using class method **findOneAndRemove**', async () => {
      await User.findOneAndRemove({ _id: user._id });
      const doesUserExit = await User.exists({ _id: user._id });
      expect(doesUserExit).toBeNull();
    });

    it('should remove record from the database using class method **findByIdAndRemove**', async () => {
      await User.findByIdAndRemove({ _id: user._id });
      const doesUserExit = await User.any({ _id: user._id });
      expect(doesUserExit).toBeFalsy();
    });
  });
});
