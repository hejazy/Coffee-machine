import { Controller, Post, Param, Get, Delete, UsePipes, Body, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoffeePodsService } from '../services';

import { 
    CoffeePodCreateDTO, CoffeePodCreateSchema, 
    CoffeePodUpdateDTO, CoffeePodUpdateSchema, 
    CoffeePodQueryDTO, CoffeePodQuerySchema, 
    MongoIdSchema,
 } from '../dtos';
import { JoiValidationPipe } from '../pipes';
import { CoffeePod } from '../models';

@ApiTags('Coffee Pods')
@Controller('')
export class CoffeePodController {
  constructor(private readonly service: CoffeePodsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe({
    body: CoffeePodCreateSchema,
  }))
  async add(
    @Body() coffeePod: CoffeePodCreateDTO,
  ): Promise<CoffeePod> {
    return await this.service.create(coffeePod);
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe({
    param: {
      id: MongoIdSchema,
    },
    body: CoffeePodUpdateSchema,
  }))
  async update(
    @Body() coffeePod: CoffeePodUpdateDTO,
    @Param('id') id: string,
  ): Promise<CoffeePod> {
    return await this.service.update(id, coffeePod);
  }

  @Get()
  @UsePipes(new JoiValidationPipe({
    query: CoffeePodQuerySchema,
  }))
  async query(
    @Query() filters: CoffeePodQueryDTO,
  ): Promise<CoffeePod[]> {
    return await this.service.filter(filters);
  }

  @Get(':id')
  @UsePipes(new JoiValidationPipe({
    param: {
      id: MongoIdSchema,
    },
  }))
  async findById(
    @Param('id') id: string,
  ): Promise<CoffeePod> {
    return await this.service.findById(id);
  }

  @Delete(':id')
  @UsePipes(new JoiValidationPipe({
    param: {
      id: MongoIdSchema,
    },
  }))
  async removeById(
    @Param('id') id: string,
  ): Promise<{ message: string, deletedCount: number }> {
    return await this.service.remove(id);
  }
}
