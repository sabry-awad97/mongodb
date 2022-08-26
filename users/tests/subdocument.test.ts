import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
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

describe('Subdocuments', () => {
  it('should create a new subdocument', async () => {
    const user = new User({
      name: userName,
      posts: [{ title }],
    });
    await user.save();
    expect(!user.isNew).toEqual(true);

    const found = await User.findOne({ name: userName });
    expect(found).not.toBeNull();
    expect(found?.posts[0].title).toEqual(title);
  });

  it('should add a subdocuments to an existing record', async () => {
    const user = new User({
      name: userName,
      posts: [],
    });

    await user.save();
    expect(!user.isNew).toEqual(true);

    const found = await User.findOne({ name: userName });
    expect(found).not.toBeNull();

    found!.posts.push({ title });

    expect(found!.posts[0].isNew).toEqual(true);

    await found!.save();

    const exists = await User.findOne({ name: userName });
    expect(exists).not.toBeNull();
    expect(exists!.posts[0].title).toEqual(title);
  });
});
