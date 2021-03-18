import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CoffeeMachinesService } from './';

describe('Coffee Machine Service', () => {
  let service;
  function mockCoffeeMachineModel() {
    this.findOne = () => 'got Coffee Machine';
    this.deleteOne = () => ({ok: true, deletedCount: 1});
    this.aggregate = () => ['Coffee Machine'];
    this.create = () => 'created Coffee Machine'
    this.findOneAndUpdate = () => 'updated Coffee Machine'
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CoffeeMachinesService,
        {
          provide: getModelToken('coffee-machine'),
          useValue: new mockCoffeeMachineModel(),
        },
       ],
    }).compile();
    service = module.get<CoffeeMachinesService>(CoffeeMachinesService);
  });
  it('get coffee machine', async () => {
    const expectedValue = 'got Coffee Machine';
    expect(await service.findById('id')).toEqual(expectedValue);
  });
  it('remove coffee machine', async () => {
    const expectedValue = {message: 'Data deleted successfully', deletedCount: 1};
    expect(await service.remove('id')).toEqual(expectedValue);
  });
  it('get many coffee machines', async () => {
    const expectedValue = ['Coffee Machine'];
    expect(await service.filter({})).toEqual(expectedValue);
  });
  it('remove coffee machine', async () => {
    const expectedValue = 'created Coffee Machine';
    expect(await service.create('new one')).toEqual(expectedValue);
  });
  it('remove coffee machine', async () => {
    const expectedValue = 'updated Coffee Machine';
    expect(await service.update('update data')).toEqual(expectedValue);
  });
});
