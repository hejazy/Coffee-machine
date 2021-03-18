import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CoffeePodController } from '../controllers';
import { CoffeePodsService } from '../services';
import { CoffeePodMongoSchema } from '../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'coffee-pod', schema: CoffeePodMongoSchema }]),
  ],
  controllers: [CoffeePodController],
  providers: [
    CoffeePodsService,
  ],
  exports: [
    CoffeePodsService,
  ],
})
export class CoffeePodModule {}
