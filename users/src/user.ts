import { model, Schema, Document, Model, Types } from 'mongoose';
import PostSchema, { IPost } from './post';

interface IUser {
  name: string;
  postCount: number;
  posts: Types.DocumentArray<IPost>;
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
  postCount: {
    type: Number,
  },
  posts: [PostSchema],
});

UserSchema.static('any', async function any(query) {
  const result = await this.findOne(query).select('_id').lean();
  return result ? true : false;
});

const User = model<IUserDoc, IUserModel>('user', UserSchema);

export default User;
