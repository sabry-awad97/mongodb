import { HydratedDocument, Types } from 'mongoose';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import database from '../src';
import User, { IUser } from '../src/user';

let user: HydratedDocument<IUser>;

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
  user = new User({
    name: userName,
    posts: [{ title }],
  });
});

describe('Subdocuments', () => {
  it('should create a new subdocument', async () => {
    await user.save();
    expect(!user.isNew).toEqual(true);

    const found = await User.findOne({ name: userName });
    expect(found).not.toBeNull();
    expect(found?.posts[0].title).toEqual(title);
  });

  it('should add a subdocuments to an existing record', async () => {
    await user.save();

    const found = await User.findOne({ name: userName });

    found!.posts.push({ title });

    await found!.save();

    const exists = await User.findOne({ name: userName });

    expect(exists!.posts[0].title).toEqual(title);
  });

  it('should remove a subdocument from an existing document', async () => {
    await user.save();

    const found = await User.findOne({ name: userName });

    await found!.posts[0].remove();

    await found!.save();

    const exists = await User.findOne({ name: userName });

    expect(exists!.posts.length).toEqual(user.posts.length - 1);
  });
});
