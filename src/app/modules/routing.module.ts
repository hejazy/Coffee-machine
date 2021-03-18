import { Module } from "@nestjs/common";
import { Route, RouterModule } from "nest-router";
import {
  CoffeeMachineModule,
  CoffeePodModule,
} from ".";

const routes: Route[] = [
  {
    path: '/coffee-machine',
    module: CoffeeMachineModule,
  },
  {
    path: '/coffe-pod',
    module: CoffeePodModule,
  }
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    CoffeeMachineModule,
    CoffeePodModule,
  ],
})
export class RoutingModule { }