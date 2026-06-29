"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Movia Automobile - API REST')
        .setDescription('Documentation des endpoints du backend Movia Automobile (location et vente de vehicules). ' +
        "Examen final API REST - M. Soumare - Licence 2 GI.")
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: "Coller ici le token recu via POST /auth/login",
    }, 'access-token')
        .addTag('auth', 'Inscription et connexion')
        .addTag('users', 'Gestion des utilisateurs et du profil')
        .addTag('vehicules', 'Catalogue de vehicules (location/vente)')
        .addTag('reservations', 'Reservations de location ou d\'achat')
        .addTag('notifications', 'Notifications administrateur')
        .addTag('exchange-rate', 'Integration API externe ExchangeRate (conversion de devises)')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Movia Automobile API demarree sur http://localhost:${process.env.PORT ?? 3000}/api`);
    console.log(`Documentation Swagger disponible sur http://localhost:${process.env.PORT ?? 3000}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map