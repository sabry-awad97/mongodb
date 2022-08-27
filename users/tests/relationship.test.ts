import { HydratedDocument, Types } from 'mongoose';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import database from '../src';
import BlogPost, { IBlogPost } from '../src/blog-post';
import Comment, { IComment } from '../src/comment';
import User, { IUser } from '../src/user';

const userName = 'Joe';
const title = 'JS is Great';
const content = 'JS is Great';

let user: HydratedDocument<IUser>;
let blogPost: HydratedDocument<IBlogPost>;
let comment: HydratedDocument<IComment>;

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
  blogPost = new BlogPost({ title, content });
  comment = new Comment({ content });

  user.blogPosts.push(blogPost._id);
  blogPost.comments.push(comment._id);
  comment.user = user._id;

  await Promise.all([user.save(), blogPost.save(), comment.save()]);
});

describe('Relationships', () => {
  it('should save a relation between a user and a blog post', async () => {
    const user = await User.findOne({ name: userName }).populate({
      path: 'blogPosts',
    });

    expect(user!.blogPosts[0]).toMatchObject({ title, content });
  });

  it('should save a full relation graph', async () => {
    const doc = await User.findOne({ name: userName }).populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          model: 'User',
        },
      },
    });

    const [blogPost] = doc!.blogPosts as IBlogPost[];
    const [comment] = blogPost.comments as IComment[];
    const user = comment.user as IUser;

    expect(doc!.name).toEqual(userName);
    expect(blogPost.title).toEqual(title);
    expect(comment.content).toEqual(content);
    expect(user.name).toEqual(userName);
  });
});
