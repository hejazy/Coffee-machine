import { ApiProperty } from '@nestjs/swagger';
import * as Joi from '@hapi/joi';
import { CoffeeMachineTypeEnum } from '../enum';

export class CoffeeMachineCreateDTO {
  @ApiProperty({ description: 'coffee machine ref name', type: String, required: true })
  ref_name: string;

  @ApiProperty({ description: 'coffee machine type', enum: CoffeeMachineTypeEnum, required: true })
  product_type: CoffeeMachineTypeEnum;

  @ApiProperty({ description: 'coffee machine type', type: Boolean, required: true })
  water_line_compatible: boolean;
}

const CoffeeMachineCreateSchemaFactory = () => {
  const schema: any = {
    ref_name: Joi.string().required(),
    product_type: Joi.string().valid(...Object.keys(CoffeeMachineTypeEnum)).required(),
    water_line_compatible: Joi.boolean().required(),

  };
  return Joi.object().keys(schema);
};
export const CoffeeMachineCreateSchema = CoffeeMachineCreateSchemaFactory();
