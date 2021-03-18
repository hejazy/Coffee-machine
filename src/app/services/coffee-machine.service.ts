import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import {
  CoffeeMachineQueryDTO,
  CoffeeMachineCreateDTO,
  CoffeeMachineUpdateDTO,
} from '../dtos';

import { CoffeeMachine } from '../models';

@Injectable()
export class CoffeeMachinesService {
  constructor(
    @InjectModel('coffee-machine') private readonly coffeMachineModel: Model<CoffeeMachine>,
  ) {
  }

  async findById(id: string): Promise<CoffeeMachine> {
    return await this.coffeMachineModel.findOne({ _id: id });
  }
  async remove(id: string): Promise<{ message: string, deletedCount: number }> {
    const response = await this.coffeMachineModel.deleteOne({ _id: id });
    return {
      message: response.ok ? 'Data deleted successfully' : 'not valid',
      deletedCount: response.deletedCount,
    };
  }
  async filter(filters: CoffeeMachineQueryDTO)
    : Promise<CoffeeMachine[]> {
    let count;
    const pipeLine: any = [
      { $match: this.queryMaker(filters) },
    ];
    return await this.coffeMachineModel.aggregate(pipeLine);
  }

  async create(coffeeMachine: CoffeeMachineCreateDTO): Promise<CoffeeMachine> {
    return await this.coffeMachineModel.create(coffeeMachine);
  }

  async update(id: string, coffeeMachine: CoffeeMachineUpdateDTO): Promise<CoffeeMachine> {
    return await this.coffeMachineModel.findOneAndUpdate(
      { _id: id, },
      { $set: {...coffeeMachine, updated_at: new Date() }}, { new: true },
    );
  }
  private queryMaker(filters: CoffeeMachineQueryDTO) {
    const query: any = {};
    if (filters.product_type) {
      query.product_type = filters.product_type;
    }
    if (filters.water_line_compatible) {
      query.water_line_compatible = (filters.water_line_compatible === 'true');
    }
    return query;
  }
}
