import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://pandoreinfluencerfrontend.vercel.app',
      'https://www.instagram.com',
      'https://www.facebook.com',
      'https://www.linkedin.com',
      'https://x.com',
      'https://www.tiktok.com',
      'chrome-extension://dnkjkcnopgdjhmkhapenjopjpiikaljc',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type, Authorization'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  console.log(`Application is running on: http://localhost:${port}`);

  await app.listen(port);
}

bootstrap();
