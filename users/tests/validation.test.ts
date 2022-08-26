import { Error } from 'mongoose';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import database from '../src';
import User from '../src/user';

beforeAll(async () => {
  await database.connect('users_test');
});

afterAll(async () => {
  await database.disconnect();
});

describe('Validating records', async () => {
  it('should validate record with required fields using validateSync', async () => {
    const user = new User({ name: null });
    const validationError = user.validateSync();
    expect(validationError?.errors.name.message).toMatch(
      'Name must be provided.'
    );
  });

  it('should validate record more than 2 characters using validateSync', async () => {
    const user = new User({ name: 'AB' });
    const validationError = user.validateSync();
    console.log(validationError);

    expect(validationError?.errors.name.message).toMatch(
      'Name must be longer than 2 characters.'
    );
  });

  it('should validate record more than 2 characters using instance method validate', async () => {
    const user = new User({ name: 'AB' });
    const t = async () => {
      await user.validate();
    };

    await expect(t).rejects.toThrow();
    await expect(t).rejects.toBeInstanceOf(Error.ValidationError);
    await expect(t).rejects.toMatchObject({
      errors: {
        name: {
          message: 'Name must be longer than 2 characters.',
        },
      },
    });
  });

  it('should disallow invalid records from being created', async () => {
    const user = new User({ name: 'AB' });
    try {
      await user.save();
    } catch (error: any) {
      expect(error.errors.name.message).toMatch('2 characters');
    }
  });
});
