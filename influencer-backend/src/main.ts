import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour des origines spécifiques (exemple : Instagram et une extension Chrome)
  app.enableCors({
    origin: [
      'https://www.instagram.com',
      'chrome-extension://kabjhgpchbndlaignhbiibcdfpcddpml',
      'https://www.facebook.com',
      'chrome-extension://poojmfapemijoppakejdkcpjgefmldgb',
      'https://www.linkedin.com',
      'chrome-extension://mmbnkjbihbociakkafncmhkffhniaiff',
      'https://x.com',
      'chrome-extension://pkahcggjmbhmpgmdhkemgfnblpjidgpa',
    ], // Liste des origines autorisées
    methods: 'GET,POST', // Méthodes HTTP autorisées
    allowedHeaders: 'Content-Type', // En-têtes autorisés
  });

  const port = process.env.PORT ?? 3000;
  console.log(`Application is running on: http://localhost:${port}`);

  await app.listen(port);
}

bootstrap();
