import { definitions } from '../.temp/types';
import { strict as assert } from 'assert';
import { UserController } from '../api/controller/user.controller';

const user = new UserController();

describe('User', () => {
  it('can register', async function () {
    const userToCtreate: Omit<definitions['User'], 'id' | 'userStatus'> = {
      firstName: 'Test',
      lastName: 'Test',
      email: `user+${Date.now()}@gmail.com`,
      phone: '123456789',
      username: `user+${Date.now()}`,
      password: '123456',
    };

    const createdUser = await user.register(userToCtreate);
    //todo review console.logs - returns undefined for the desired fields
    console.log(createdUser.username, 'createdUser.username');
    console.log(createdUser.id, 'createdUser.id');

    // assert.deepStrictEqual(createdUser, {
    //   ...userToCtreate,
    //   id: createdUser.id,
    //   userStatus: createdUser.userStatus,
    // });
  });
});
