import { Test } from '@nestjs/testing';
import { CoffeePodController } from './';
import { CoffeePodsService} from '../services';
const mockCoffeePodsService = () => ({
  create: jest.fn(),
  update: jest.fn(),
  filter: jest.fn(),
  findById: jest.fn(),
  remove: jest.fn(),
});

describe('Coffee Pods Controller', () => {
  let controller;
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CoffeePodController],
      providers: [
        { provide: CoffeePodsService, useFactory: mockCoffeePodsService },
      ],
    }).compile();

    controller = module.get<CoffeePodController>(CoffeePodController);
    service = module.get<CoffeePodsService>(CoffeePodsService);
  });
  it('save new coffee pod', async () => {
    const expectedResult = 'Coffee Pod';
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
    expect(await controller.add('coffee pod', 'user data')).toBe(expectedResult);
  });
  it('update coffee pod', async () => {
    const expectedResult = 'Coffee Pod';
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
    expect(await controller.update('coffee pod')).toBe(expectedResult);
  });
  it('filter coffee pods', async () => {
    const expectedResult = ['Coffee Pod', 'Coffee Pod'];
    jest.spyOn(service, 'filter').mockResolvedValue(expectedResult);
    expect(await controller.query('query')).toBe(expectedResult);
  });
  it('find coffee pod By Id', async () => {
    const expectedResult = 'Coffee Pod';
    jest.spyOn(service, 'findById').mockResolvedValue(expectedResult);
    expect(await controller.findById('the id')).toBe(expectedResult);
  });
  it('delete coffee pod By Id', async () => {
    const expectedResult = { message: 'deleted successfully', deletedCount: 1 };
    jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
    expect(await controller.removeById('the id')).toBe(expectedResult);
  });
});
