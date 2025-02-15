import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  NextServer  from 'next';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = NextServer({ dev });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  app.use((req: Request, res: Response, next: NextFunction) => {
    handle(req, res);
  });

  await app.listen(3000);
}
bootstrap();
