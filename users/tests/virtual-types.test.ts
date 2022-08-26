import { describe, it, beforeAll, afterAll, expect, beforeEach } from 'vitest';
import database from '../src';
import User from '../src/user';

const userName = 'John';
const title = 'title';

beforeAll(async () => {
  await database.connect('users_test');
});

afterAll(async () => {
  await database.disconnect();
});

beforeEach(async () => {
  await User.collection.drop();
});

describe('Virtual Types', async () => {
  it('should compute postCount', async () => {
    const user = new User({
      name: userName,
      posts: [{ title }],
    });

    await user.save();

    const found = await User.findOne({ name: userName });

    expect(found!.postCount).toEqual(user.posts.length);
  });
});
