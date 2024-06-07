import { strict as assert } from 'assert';
import { PetController } from '../api/controller/pet.controller';

const pet = new PetController();

describe('User can get pet by', function () {
  it('id', async function () {
    const body = await pet.getById(1);

    assert(body.id == 1, `Expected response with id = 1, but got ${body.id}`);
  });

  it('status', async function () {
    let body = await pet.findByStatus('available');

    assert(body.length > 0);

    body = await pet.findByStatus('sold');

    assert(body.length > 0);

    body = await pet.findByStatus('pending');

    assert(body.length > 0);

    body = await pet.findByStatus(['available', 'sold', 'pending']);

    assert(body.length > 0);
    assert(body.some((pet: any) => pet.status == 'available'));
    assert(body.some((pet: any) => pet.status == 'pending'));
  });

  it('tag', async function () {
    const body = await pet.findByTags('tag1');

    assert(body.length > 0);
    assert(body.every((pet: any) => pet.tags.some((tag: any) => tag.name == 'tag1')));
  });
});
