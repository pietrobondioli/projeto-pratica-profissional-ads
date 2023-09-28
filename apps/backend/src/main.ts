import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllExceptionsFilter } from './lib/application/exceptions/all-exceptions.filter';
import { ReqContextInterceptor } from './lib/application/request/req-context.interceptor';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  console.log(`Environment: ${process.env.NODE_ENV}`);

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new ReqContextInterceptor());

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('EquipRent API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'apiKey',
      scheme: 'bearer',
      name: 'authorization',
      in: 'header',
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
