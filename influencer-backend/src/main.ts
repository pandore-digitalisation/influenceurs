import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour des origines spécifiques (exemple : Instagram et une extension Chrome)
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://pandoreinfluencerfrontend.vercel.app',
      'chrome-extension://dnkjkcnopgdjhmkhapenjopjpiikaljc',
      'https://www.instagram.com',
      'chrome-extension://kabjhgpchbndlaignhbiibcdfpcddpml',
      'https://www.facebook.com',
      'chrome-extension://poojmfapemijoppakejdkcpjgefmldgb',
      'https://www.linkedin.com',
      'chrome-extension://mmbnkjbihbociakkafncmhkffhniaiff',
      'https://x.com',
      'chrome-extension://pkahcggjmbhmpgmdhkemgfnblpjidgpa',
      'https://www.tiktok.com',
    ], // Liste des origines autorisées
    methods: ['GET,POST, DELETE, PATCH'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type, Authorization'], // En-têtes autorisés
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  console.log(`Application is running on: http://localhost:${port}`);

  await app.listen(port);
}

bootstrap();
