import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration CORS
  app.enableCors({
    origin: [
      'http://localhost:3001', // Frontend local
      'https://pandoreinfluencerfrontend.vercel.app', // Frontend déployé
      'https://www.instagram.com', // Origine API Instagram
      'https://www.facebook.com', // Origine API Facebook
      'https://www.linkedin.com', // Origine API LinkedIn
      'https://x.com', // Origine API Twitter (anciennement Twitter)
      'https://www.tiktok.com', // Origine API TikTok
      'chrome-extension://dnkjkcnopgdjhmkhapenjopjpiikaljc', // Extension Chrome
    ],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    credentials: true, // Autoriser les cookies et les en-têtes d'autorisation
  });

  const port = process.env.PORT ?? 3000;
  console.log(`Application is running on: http://localhost:${port}`);

  await app.listen(port);
}

bootstrap();
