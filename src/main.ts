import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefixe global -> toutes les routes commencent par /api (ex: /api/vehicules)
  app.setGlobalPrefix('api');

  // Validation automatique des DTO (class-validator) sur toutes les routes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS ouvert pour permettre au frontend Movia Automobile (Vite, autre port)
  // de consommer l'API depuis le navigateur
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Documentation interactive des endpoints (exigence "Documenter les endpoints principaux")
  // Disponible sur http://localhost:3000/api/docs une fois le serveur demarre
  const config = new DocumentBuilder()
    .setTitle('Movia Automobile - API REST')
    .setDescription(
      'Documentation des endpoints du backend Movia Automobile (location et vente de vehicules). ' +
        'Examen final API REST - M. Soumare - Licence 2 GI.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Coller ici le token recu via POST /auth/login',
      },
      'access-token',
    )
    .addTag('auth', 'Inscription et connexion')
    .addTag('users', 'Gestion des utilisateurs et du profil')
    .addTag('vehicules', 'Catalogue de vehicules (location/vente)')
    .addTag('reservations', "Reservations de location ou d'achat")
    .addTag('notifications', 'Notifications administrateur')
    .addTag('countries', 'Integration API externe REST Countries')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Movia Automobile API demarree sur http://localhost:${process.env.PORT ?? 3000}/api`,
  );
  console.log(
    `Documentation Swagger disponible sur http://localhost:${process.env.PORT ?? 3000}/api/docs`,
  );
}
void bootstrap();
