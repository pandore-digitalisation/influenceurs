import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS avec une origine spécifique (Instagram dans ce cas)
  app.enableCors({
    origin: 'https://www.instagram.com', // Remplacez par l'origine exacte
    methods: 'GET,POST', // Méthodes autorisées
    allowedHeaders: 'Content-Type', // En-têtes autorisés
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
