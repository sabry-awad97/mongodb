import { Types } from 'mongoose';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import database from '../src';
import User, { IUserDoc } from '../src/user';

let user: IUserDoc & {
  _id: Types.ObjectId;
};

const userName = 'John';
const updatedUserName = 'Jane';
const increment = 1;

beforeAll(async () => {
  await database.connect('users_test');
});

afterAll(async () => {
  await database.disconnect();
});

beforeEach(async () => {
  await User.collection.drop();
  user = new User({ name: userName, likes: 0 });
  await user.save();
});

describe('Updating records', () => {
  it('should update records using instance method **set - save**', async () => {
    // update attributes
    user.set('name', updatedUserName);

    // save into database
    await user.save();
    const users = await User.find({ name: updatedUserName }).select('name');
    expect(users.length).toBe(1);
    expect(users[0].name).toEqual(user.name);
  });

  it('should update records using instance method **update**', async () => {
    await user.update({ name: updatedUserName });
    const users = await User.find({ name: updatedUserName }).select('name');
    expect(users.length).toBe(1);
    expect(users[0].name).toEqual(updatedUserName);
  });

  it('should update one record using class method **updateOne**', async () => {
    await User.updateOne({ name: userName }, { name: updatedUserName });
    const user = await User.findOne({ name: updatedUserName });
    expect(user!).not.toBeNull();
    expect(user!.name).toEqual(updatedUserName);
  });

  it('should update one record using class method **findOneAndUpdate**', async () => {
    await User.findOneAndUpdate({ name: userName }, { name: updatedUserName });
    const user = await User.findOne({ name: updatedUserName });
    expect(user!).not.toBeNull();
    expect(user!.name).toEqual(updatedUserName);
  });

  it('should update one record using class method **findOneAndUpdate**', async () => {
    await User.findByIdAndUpdate(user._id, { name: updatedUserName });
    const users = await User.find({ name: updatedUserName });
    expect(users!).not.toMatchObject([]);
    expect(users![0].name).toEqual(updatedUserName);
  });

  it('should increment record likes by 1', async () => {
    await User.updateOne({ name: userName }, { $inc: { likes: increment } });
    const users = await User.find({ name: userName });
    expect(users![0].likes).toEqual(user.likes + increment);
  });
});
