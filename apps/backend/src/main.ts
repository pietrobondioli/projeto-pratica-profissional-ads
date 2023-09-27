import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  console.log(`Environment: ${process.env.NODE_ENV}`);

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  console.log(`Environment: ${process.env.NODE_ENV}`);

  const config = new DocumentBuilder()
    .setTitle('EquipRent API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      name: 'Authorization',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/api', app, document);

  console.log(`Environment: ${process.env.NODE_ENV}`);
  app.useGlobalPipes(new ValidationPipe());
  console.log(`Environment: ${process.env.PORT}`);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Environment: ${process.env.PORT}`);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/docs/api`);
}
bootstrap();
