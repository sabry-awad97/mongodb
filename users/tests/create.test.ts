import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import database from '../src';
import User from '../src/user';

describe('User', () => {
  beforeAll(async () => {
    await database.connect('users_test');
  });

  beforeEach(async () => {
    // await database.dropCollection('users');
    await User.collection.drop();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  describe('Creating records', () => {
    it('should saves a new user', async () => {
      const joe = new User({ name: 'Joe' });
      await joe.save();
      expect(!joe.isNew).toEqual(true);
    });
  });
});
