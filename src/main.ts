import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { config, allowDevMode, LoggerService } from './infrastructure';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(new LoggerService());
  app.setGlobalPrefix(process.env.BASE_ROUTE || 'api/v1');
  allowDevMode(app);
  const port = process.env.PORT || config.server.port;
  await app.listen(port);
}
bootstrap();
