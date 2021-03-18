import { Test } from '@nestjs/testing';
import { CoffeeMachineController } from './';
import { CoffeeMachinesService} from '../services';
const mockCoffeeMachinesService = () => ({
  create: jest.fn(),
  update: jest.fn(),
  filter: jest.fn(),
  findById: jest.fn(),
  remove: jest.fn(),
});

describe('Coffee Machines Controller', () => {
  let controller;
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CoffeeMachineController],
      providers: [
        { provide: CoffeeMachinesService, useFactory: mockCoffeeMachinesService },
      ],
    }).compile();

    controller = module.get<CoffeeMachineController>(CoffeeMachineController);
    service = module.get<CoffeeMachinesService>(CoffeeMachinesService);
  });
  it('save new coffee achine', async () => {
    const expectedResult = 'coffee machine';
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
    expect(await controller.add('coffee achine')).toBe(expectedResult);
  });
  it('update coffee achine', async () => {
    const expectedResult = 'coffee machine';
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
    expect(await controller.update('coffee achine')).toBe(expectedResult);
  });
  it('filter coffee achines', async () => {
    const expectedResult = ['coffee machine', 'coffee machine'];
    jest.spyOn(service, 'filter').mockResolvedValue(expectedResult);
    expect(await controller.query('query')).toBe(expectedResult);
  });
  it('find coffee achine By Id', async () => {
    const expectedResult = 'coffee machine';
    jest.spyOn(service, 'findById').mockResolvedValue(expectedResult);
    expect(await controller.findById('the id')).toBe(expectedResult);
  });
  it('delete coffee achine By Id', async () => {
    const expectedResult = { message: 'deleted successfully', deletedCount: 1 };
    jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
    expect(await controller.removeById('the id')).toBe(expectedResult);
  });
});
