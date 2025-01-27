import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour des origines spécifiques (exemple : Instagram et une extension Chrome)
  app.enableCors({
    origin: '*', // Liste des origines autorisées
    methods: ['GET', 'POST', 'DELETE', 'PATCH'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  console.log(`Application is running on: http://localhost:${port}`);

  await app.listen(port);
}

bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Activer CORS pour des origines spécifiques (exemple : Instagram et une extension Chrome)
//   app.enableCors({
//     origin: [
//       'http://localhost:3001',
//       'https://pandoreinfluencerfrontend.vercel.app',
//       'https://www.instagram.com',
//       'https://www.facebook.com',
//       'https://www.linkedin.com',
//       'https://x.com',
//       'https://www.tiktok.com',
//       'chrome-extension://dnkjkcnopgdjhmkhapenjopjpiikaljc',
//     ], // Liste des origines autorisées
//     methods: ['GET', 'POST', 'DELETE', 'PATCH'], // Méthodes HTTP autorisées
//     allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
//     credentials: true,
//   });

//   const port = process.env.PORT ?? 3000;
//   console.log(`Application is running on: http://localhost:${port}`);

//   await app.listen(port);
// }

// bootstrap();
