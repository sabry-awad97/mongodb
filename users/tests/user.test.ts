import { Types } from 'mongoose';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import database from '../src';
import User, { IUserDoc } from '../src/user';

describe('User', () => {
  let user: IUserDoc & {
    _id: Types.ObjectId;
  };

  const userName = 'John';
  const updatedUserName = 'Jane';
  const increment = 1;

  beforeAll(async () => {
    await database.connect('users_test');
  });

  afterAll(async () => {
    await database.disconnect();
  });

  describe('Deleting records', () => {
    beforeEach(async () => {
      await User.collection.drop();
      user = new User({ name: userName });
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
