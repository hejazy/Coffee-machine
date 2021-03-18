import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import {
    CoffeePodQueryDTO,
    CoffeePodCreateDTO,
    CoffeePodUpdateDTO,
  } from '../dtos';

import { CoffeePod } from '../models';

@Injectable()
export class CoffeePodsService {
  constructor(
    @InjectModel('coffee-pod') private readonly coffePodModel: Model<CoffeePod>,
  ) {
  }

  async findById(id: string): Promise<CoffeePod> {
    return await this.coffePodModel.findOne({ _id: id });
  }
  async remove(id: string): Promise<{ message: string, deletedCount: number }> {
    const response = await this.coffePodModel.deleteOne({ _id: id });
    return {
      message: response.ok ? 'Data deleted successfully' : 'not valid',
      deletedCount: response.deletedCount,
    };
  }
  async filter(filters: CoffeePodQueryDTO)
    : Promise<CoffeePod[]> {
    let count;
    const pipeLine: any = [
      { $match: this.queryMaker(filters) },
    ];
    return await this.coffePodModel.aggregate(pipeLine);
  }

  async create(coffeePod: CoffeePodCreateDTO): Promise<CoffeePod> {
    return await this.coffePodModel.create(coffeePod);
  }

  async update(id: string, coffeePod: CoffeePodUpdateDTO): Promise<CoffeePod> {
    return await this.coffePodModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...coffeePod, updated_at: new Date() }}, { new: true },
    );
  }
  queryMaker(filters: CoffeePodQueryDTO) {
    const query: any = {};
    if (filters.product_type) {
      query.product_type = filters.product_type;
    }
    if (filters.coffee_flavor) {
        query.coffee_flavor = filters.coffee_flavor;
    }
    if (filters.pack_size) {
        query.pack_size = parseInt(filters.pack_size, 10);
    }
    return query;
  }

}
