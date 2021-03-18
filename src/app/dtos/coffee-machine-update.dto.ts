import { ApiProperty } from '@nestjs/swagger';
import * as Joi from '@hapi/joi';
import { CoffeeMachineTypeEnum } from '../enum';

export class CoffeeMachineUpdateDTO {
  @ApiProperty({ description: 'coffee machine type', enum: CoffeeMachineTypeEnum, required: false })
  product_type: CoffeeMachineTypeEnum;

  @ApiProperty({ description: 'coffee machine type', type: Boolean, required: false })
  water_line_compatible: boolean;
}

const CoffeeMachineUpdateSchemaFactory = () => {
  const schema: any = {
    product_type: Joi.string().valid(...Object.keys(CoffeeMachineTypeEnum)),
    water_line_compatible: Joi.boolean(),

  };
  return Joi.object().keys(schema);
};
export const CoffeeMachineUpdateSchema = CoffeeMachineUpdateSchemaFactory();
