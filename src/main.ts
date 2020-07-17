import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  //Check which enviroment variable choose
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  //First log after initialization
  logger.log(`Application listening on port ${port}`)
}

bootstrap();
