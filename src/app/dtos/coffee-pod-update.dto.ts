import { ApiProperty } from '@nestjs/swagger';
import * as Joi from '@hapi/joi';
import { CoffeeFlavorEnum, CoffeePodTypeEnum } from '../enum';

export class CoffeePodUpdateDTO {
  @ApiProperty({ description: 'coffee pod type', enum: CoffeePodTypeEnum, required: false })
  product_type: CoffeePodTypeEnum;

  @ApiProperty({ description: 'coffee pod flavor', enum: CoffeeFlavorEnum, required: false })
  coffee_flavor: CoffeePodTypeEnum;

  @ApiProperty({ description: 'coffee pod size', type: Number, required: false })
  pack_size: number;
}

const CoffeePodUpdateSchemaFactory = () => {
  const schema: any = {
    product_type: Joi.string().valid(...Object.keys(CoffeePodTypeEnum)),
    coffee_flavor: Joi.string().valid(...Object.keys(CoffeeFlavorEnum)),
    pack_size: Joi.number().valid(...[1, 3, 5, 7]),
  };
  return Joi.object().keys(schema);
};
export const CoffeePodUpdateSchema = CoffeePodUpdateSchemaFactory();
