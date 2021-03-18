import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CoffeePodsService } from './';

describe('Coffee Pod Service', () => {
  let service;
  function mockCoffeePodModel() {
    this.findOne = () => 'got Coffee Pod';
    this.deleteOne = () => ({ok: true, deletedCount: 1});
    this.aggregate = () => ['Coffee Pod'];
    this.create = () => 'created Coffee Pod'
    this.findOneAndUpdate = () => 'updated Coffee Pod'
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CoffeePodsService,
        {
          provide: getModelToken('coffee-pod'),
          useValue: new mockCoffeePodModel(),
        },
       ],
    }).compile();
    service = module.get<CoffeePodsService>(CoffeePodsService);
  });
  it('get coffee pod', async () => {
    const expectedValue = 'got Coffee Pod';
    expect(await service.findById('id')).toEqual(expectedValue);
  });
  it('remove coffee pod', async () => {
    const expectedValue = {message: 'Data deleted successfully', deletedCount: 1};
    expect(await service.remove('id')).toEqual(expectedValue);
  });
  it('get many coffee pods', async () => {
    const expectedValue = ['Coffee Pod'];
    expect(await service.filter({})).toEqual(expectedValue);
  });
  it('remove coffee pod', async () => {
    const expectedValue = 'created Coffee Pod';
    expect(await service.create('new one')).toEqual(expectedValue);
  });
  it('remove coffee pod', async () => {
    const expectedValue = 'updated Coffee Pod';
    expect(await service.update('update data')).toEqual(expectedValue);
  });
});
