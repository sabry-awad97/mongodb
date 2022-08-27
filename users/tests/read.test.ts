import { HydratedDocument } from 'mongoose';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import database from '../src';
import User, { IUser } from '../src/user';

let joe: HydratedDocument<IUser>;
let alex: HydratedDocument<IUser>;
let maria: HydratedDocument<IUser>;
let zach: HydratedDocument<IUser>;

beforeAll(async () => {
  await database.connect('users_test');
});

afterAll(async () => {
  await database.disconnect();
});

beforeEach(async () => {
  await User.collection.drop();
  joe = new User({ name: 'Joe' });
  alex = new User({ name: 'Alex' });
  maria = new User({ name: 'Maria' });
  zach = new User({ name: 'Zach' });
  await User.insertMany([joe, alex, maria, zach]);
});

describe('Reading records', () => {
  it('should find records with a given name', async () => {
    const joes = await User.find({ name: 'Joe' }).select('name');
    expect(joes[0]._id).toEqual(joe._id);
    expect(joes[0]._id.toString()).toBe(joe._id.toString());
  });

  it('should find record with a given id', async () => {
    const found = await User.findOne({ id: joe._id });
    expect(found!.name).toEqual(joe.name);
  });

  it('should be able to skip and limit the result set', async () => {
    const users = await User.find({}).sort({ name: 1 }).skip(1).limit(2);
    expect(users.length).toEqual(2);
    expect(users[0].name).toEqual('Joe');
    expect(users[1].name).toEqual('Maria');
  });
});
