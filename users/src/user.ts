import { model, Schema, Document } from 'mongoose';

interface IUser {
  name: string;
}

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema<IUserDoc>({
  name: String,
});

const User = model('user', UserSchema);

export default User;
