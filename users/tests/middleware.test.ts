import { HydratedDocument } from 'mongoose';
import { describe, it, beforeEach, expect, afterAll, beforeAll } from 'vitest';
import database from '../src';
import BlogPost, { IBlogPost } from '../src/blog-post';
import User, { IUser } from '../src/user';

let user: HydratedDocument<IUser>;
let blogPost: HydratedDocument<IBlogPost>;

const userName = 'John';

beforeAll(async () => {
  await database.connect('users_test');
});

afterAll(async () => {
  await database.disconnect();
});

beforeEach(async () => {
  const collections = await database.connection.db.collections();

  for (const collection of collections) {
    await collection.drop();
  }

  user = new User({ name: userName });

  blogPost = new BlogPost({
    title: 'JS is Great',
    content: 'Yep it really is',
  });

  user.blogPosts.push(blogPost);

  await Promise.all([user.save(), blogPost.save()]);
});

describe('Middlware', async () => {
  it('users clean up dangling blogposts on remove', async () => {
    await user.remove();
    const count = await BlogPost.count();
    expect(count).toEqual(0);
  });
});
