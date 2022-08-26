import { model, Schema, Document, Model } from 'mongoose';

interface IUser {
  name: string;
  postCount: number;
}

export interface IUserDoc extends IUser, Document {}

interface IUserModel extends Model<IUser> {
  any(...args: Parameters<typeof Model.findOne>): Promise<boolean>;
}

const UserSchema = new Schema<IUserDoc>({
  name: {
    type: String,
    required: [true, 'Name must be provided.'],
  },
  postCount: {
    type: Number,
  },
});

UserSchema.static('any', async function any(query) {
  const result = await this.findOne(query).select('_id').lean();
  return result ? true : false;
});

const User = model<IUserDoc, IUserModel>('user', UserSchema);

export default User;
