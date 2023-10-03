import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { configuration } from './config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  await app.listen(configuration().port).then(() => {
    logger.log(`Application is running on port: ${configuration().port}`);
  });
}
bootstrap();
