import { JsonRequest } from 'http-req-builder';
import { operations } from '../../.temp/types';

export class StoreController {
  async getInventory() {
    return (
      // .send<operations['getInventory']['responses']['200']['schema']>()
      (
        await new JsonRequest()
          .url('https://petstore.swagger.io/v2/store/inventory')
          .send()
      ).body
    );
  }
}
