import { model, Schema, Document, Model, Types } from 'mongoose';
import PostSchema, { IPost } from './post';

interface IUser {
  name: string;
  posts: Types.DocumentArray<IPost>;
  postCount: number;
  likes: number;
}

export interface IUserDoc extends IUser, Document {}

interface IUserModel extends Model<IUser> {
  any(...args: Parameters<typeof Model.findOne>): Promise<boolean>;
}

const UserSchema = new Schema<IUserDoc>({
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
});

UserSchema.virtual('postCount').get(function (this: IUser) {
  return this.posts.length;
});

UserSchema.static('any', async function any(query) {
  const result = await this.findOne(query).select('_id').lean();
  return result ? true : false;
});

const User = model<IUserDoc, IUserModel>('user', UserSchema);

export default User;
