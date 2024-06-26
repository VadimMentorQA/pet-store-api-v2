import { strict as assert } from 'assert';
import { PetController } from '../api/controller/pet.controller';
import { definitions } from '../.temp/types';

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
    assert(body.some((pet) => pet.status == 'available'));
    assert(body.some((pet) => pet.status == 'pending'));
  });

  it('tag', async function () {
    const body = await pet.findByTags('tag1');

    assert(body.length > 0);
    assert(body.every((pet) => pet.tags?.some((tag) => tag.name == 'tag1')));
  });

  it('can be added, updated, deleted', async function () {
    const petToCreate: Omit<definitions['Pet'], 'id'> = {
      category: {
        id: 0,
        name: 'string',
      },
      name: 'Doggo',
      photoUrls: [
        'https://img.freepik.com/premium-photo/cute-little-puppy-happy-dog_34683-4162.jpg',
      ],
      tags: [
        {
          id: 0,
          name: 'string',
        },
      ],
      status: 'available',
    };

    const addedPet = await pet.addNew(petToCreate);

    assert.deepEqual(
      addedPet,
      {
        ...petToCreate,
        id: addedPet.id,
      },
      'Expect created pet'
    );

    const foundAddedPet = await pet.getById(addedPet.id);

    assert.deepEqual(
      foundAddedPet,
      {
        ...petToCreate,
        id: addedPet.id,
      },
      'Expect created pet to be found'
    );
    const newerPet: definitions['Pet'] = {
      id: addedPet.id,

      category: {
        id: 0,
        name: 'string',
      },
      name: 'Kitty',
      photoUrls: [
        'https://img.freepik.com/premium-photo/cute-little-puppy-happy-dog_34683-4162.jpg',
      ],
      tags: [
        {
          id: 0,
          name: 'string',
        },
      ],
      status: 'available',
    };

    const updatedPet = await pet.update(newerPet);
    assert.deepEqual(newerPet, updatedPet, 'Expect to have updated pet');

    await pet.delete(addedPet.id);
  });
});
