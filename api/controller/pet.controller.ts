import { URLSearchParams } from 'url';
import { JsonRequest } from 'http-req-builder';
import { definitions, operations } from '../../.temp/types';
import { AllureStep } from '../../utils/allureStep';

export class PetController {
  @AllureStep(`[Petcontroller] getById`)
  async getById(id: number | string) {
    return (await new JsonRequest().url(`http://localhost/v2/pet/${id}`).send()).body;
  }

  @AllureStep(`[Petcontroller] findByTags`)
  async findByTags(tags: string | string[]) {
    return (
      await new JsonRequest()
        .url('http://localhost/v2/pet/findByTags')
        .searchParams(new URLSearchParams({ tags }))
        .send<operations['findPetsByTags']['responses']['200']['schema']>()
    ).body;
  }
  @AllureStep(`[Petcontroller] findByStatus`)
  async findByStatus(status: string | string[]) {
    return (
      await new JsonRequest()
        .url('http://localhost/v2/pet/findByStatus')
        .searchParams(new URLSearchParams({ status }))
        .send<operations['findPetsByStatus']['responses']['200']['schema']>()
    ).body;
  }

  @AllureStep(`[Petcontroller] addNew`)
  async addNew(pet: Omit<definitions['Pet'], 'id'>) {
    return (
      await new JsonRequest()
        .url('http://localhost/v2/pet')
        .method('POST')
        .body(pet)
        .send()
    ).body;
  }
  //mocha fails with 404 for enabled @AllureStep(`[Petcontroller] delete`)
  // @AllureStep(`[Petcontroller] delete`)
  async delete(id: number | string) {
    return (
      await new JsonRequest()
        .url(`http://localhost/v2/pet/${id}`)
        .method('DELETE')
        .send<definitions['ApiResponse']>()
    ).body;
  }
  @AllureStep(`[Petcontroller] update`)
  async update(pet: definitions['Pet']) {
    return (
      await new JsonRequest()
        .url('http://localhost/v2/pet')
        .method('PUT')
        .body(pet)
        .send<operations['updatePet']['responses']['400']>()
    ).body;
  }
}
