import { strict as assert } from 'assert';
import { PetController } from '../api/controller/pet.controller';
import { StoreController } from '../api/controller/store.controller';

const pet = new PetController();
const store = new StoreController();
//defective endpoint
describe.skip('Store', () => {
  it('should return inventory for available', async function () {
    const inventory = await store.getInventory();
    console.log(inventory, 'inventory');
    assert(Object.keys(inventory).length > 0, 'List of inv statuses must not be empty');

    await pet.addNew({
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
    });

    const inventoryWithAvailableAdded = await store.getInventory();
    assert.equal(
      inventoryWithAvailableAdded.available,
      inventory.available + 1,
      'Available number is increased'
    );
  });
});
