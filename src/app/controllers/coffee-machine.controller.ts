import { Controller, Post, Param, Get, Delete, UsePipes, Body, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoffeeMachinesService } from '../services';

import { 
    CoffeeMachineCreateDTO, CoffeeMachineCreateSchema, 
    CoffeeMachineUpdateDTO, CoffeeMachineUpdateSchema, 
    CoffeeMachineQueryDTO, CoffeeMachineQuerySchema, 
    MongoIdSchema,
 } from '../dtos';
import { JoiValidationPipe } from '../pipes';
import { CoffeeMachine } from '../models';

@ApiTags('Coffee Machines')
@Controller('')
export class CoffeeMachineController {
  constructor(private readonly service: CoffeeMachinesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe({
    body: CoffeeMachineCreateSchema,
  }))
  async add(
    @Body() coffeeMachine: CoffeeMachineCreateDTO,
  ): Promise<CoffeeMachine> {
    return await this.service.create(coffeeMachine);
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe({
    param: {
      id: MongoIdSchema,
    },
    body: CoffeeMachineUpdateSchema,
  }))
  async update(
    @Body() coffeeMachine: CoffeeMachineUpdateDTO,
    @Param('id') id: string,
  ): Promise<CoffeeMachine> {
    return await this.service.update(id, coffeeMachine);
  }

  @Get()
  @UsePipes(new JoiValidationPipe({
    query: CoffeeMachineQuerySchema,
  }))
  async query(
    @Query() filters: CoffeeMachineQueryDTO,
  ): Promise<CoffeeMachine[]> {
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
  ): Promise<CoffeeMachine> {
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
