import { JsonRequest } from 'http-req-builder';
import { definitions, operations } from '../../.temp/types';
import { AllureStep } from '../../utils/allureStep';

export class UserController {
  @AllureStep(`[UserController] register`)
  async register(user: Omit<definitions['User'], 'id' | 'userStatus'>) {
    return (
      await new JsonRequest()
        .url('http://localhost/v2/user')
        .method('POST')
        .body(user)
        .send()
    ).body;
  }
}
