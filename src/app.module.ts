import { Module } from '@nestjs/common';

import { DatabaseModule } from './infrastructure';

import { RoutingModule } from './app/modules';

@Module({
  imports: [
    RoutingModule,
    DatabaseModule,
  ],
  exports: [
    DatabaseModule,
  ]
})
export class AppModule {}
