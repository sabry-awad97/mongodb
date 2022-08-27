import { model, Schema, Document, Model, Types, PopulatedDoc } from 'mongoose';
import { IBlogPost } from './blog-post';
import PostSchema, { IPost } from './post';

export interface IUser {
  name: string;
  posts: Types.DocumentArray<IPost>;
  postCount: number;
  likes: number;
  blogPosts: PopulatedDoc<Document<Types.ObjectId> & IBlogPost>[];
}

interface IUserDoc extends IUser, Document {}

interface IUserModel extends Model<IUser> {
  any(...args: Parameters<typeof Model.findOne>): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    validate: {
      validator: (name: string) => name.length > 2,
      message: 'Name must be longer than 2 characters.',
    },
    required: [true, 'Name must be provided.'],
  },
  likes: Number,
  posts: [PostSchema],
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'BlogPost' }],
});

UserSchema.virtual('postCount').get(function (this: IUser) {
  return this.posts.length;
});

UserSchema.static('any', async function any(query) {
  const result = await this.findOne(query).select('_id').lean();
  return result ? true : false;
});

UserSchema.pre('remove', async function save(next) {
  const BlogPost = await import('./blog-post').then(m => m.default);
  await BlogPost.remove({ _id: { $in: this.blogPosts } });
  next();
});

const User = model<IUserDoc, IUserModel>('User', UserSchema);

export default User;
