import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      credentials: true,
    },
  });
  app.use(express.json({ limit: '50mb' }));

  const port = process.env.PORT || 5000;

  // Use global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Start the application
  await app.listen(port, '0.0.0.0');
}

bootstrap();
