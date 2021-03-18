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
  it('save new coffe pod', async () => {
    const expectedResult = 'Coffee Pod';
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
    expect(await controller.add('coffe pod', 'user data')).toBe(expectedResult);
  });
  it('update coffe pod', async () => {
    const expectedResult = 'Coffee Pod';
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
    expect(await controller.update('coffe pod')).toBe(expectedResult);
  });
  it('filter coffe pods', async () => {
    const expectedResult = ['Coffee Pod', 'Coffee Pod'];
    jest.spyOn(service, 'filter').mockResolvedValue(expectedResult);
    expect(await controller.query('query')).toBe(expectedResult);
  });
  it('find coffe pod By Id', async () => {
    const expectedResult = 'Coffee Pod';
    jest.spyOn(service, 'findById').mockResolvedValue(expectedResult);
    expect(await controller.findById('the id')).toBe(expectedResult);
  });
  it('delete coffe pod By Id', async () => {
    const expectedResult = { message: 'deleted successfully', deletedCount: 1 };
    jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
    expect(await controller.removeById('the id')).toBe(expectedResult);
  });
});
