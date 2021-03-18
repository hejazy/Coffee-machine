import { ApiProperty } from '@nestjs/swagger';
import * as Joi from '@hapi/joi';
import { CoffeeFlavorEnum, CoffeePodTypeEnum } from '../enum';

export class CoffeePodCreateDTO {
  @ApiProperty({ description: 'coffee machine ref name', type: String, required: true })
  ref_name: string;

  @ApiProperty({ description: 'coffee pod type', enum: CoffeePodTypeEnum, required: true })
  product_type: CoffeePodTypeEnum;

  @ApiProperty({ description: 'coffee pod flavor', enum: CoffeeFlavorEnum, required: true })
  coffee_flavor: CoffeePodTypeEnum;

  @ApiProperty({ description: 'coffee pod size, accept only (1,3,5,7)', type: Number, required: true })
  pack_size: number;
}

const CoffeePodCreateSchemaFactory = () => {
  const schema: any = {
    ref_name: Joi.string().required(),
    product_type: Joi.string().valid(...Object.keys(CoffeePodTypeEnum)).required(),
    coffee_flavor: Joi.string().valid(...Object.keys(CoffeeFlavorEnum)).required(),
    pack_size: Joi.number().valid(...[1, 3, 5, 7]).required(),

  };
  return Joi.object().keys(schema);
};
export const CoffeePodCreateSchema = CoffeePodCreateSchemaFactory();
