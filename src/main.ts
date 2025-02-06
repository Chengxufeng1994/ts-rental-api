import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './infrastructure/filter/global-exceptions.filter';
import { ResponseInterceptor } from './infrastructure/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // filters
  app.useGlobalFilters(new GlobalExceptionFilter());
  // pipes
  app.useGlobalPipes(new ValidationPipe());
  // interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Rental API')
    .setDescription('Mock rental api')
    .setVersion('1.0')
    .addTag('rental')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') || 5000;
  await app.listen(port);

  Logger.log(`Server running on :${port}`, 'Bootstrap');
}

bootstrap().catch((err) => {
  Logger.error(err, 'Bootstrap');

  const defaultExitCode = 1;
  process.exit(defaultExitCode);
});
