import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CoffeeMachineController } from '../controllers';
import { CoffeeMachinesService } from '../services';
import { CoffeeMachineMongoSchema } from '../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'coffee-machine', schema: CoffeeMachineMongoSchema }]),
  ],
  controllers: [CoffeeMachineController],
  providers: [
    CoffeeMachinesService,
  ],
  exports: [
    CoffeeMachinesService,
  ],
})
export class CoffeeMachineModule {}
