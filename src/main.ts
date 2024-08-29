import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '20mb' }));

  if (!!process.env.ENABLE_LMIT_DOMAIN) {
    app.enableCors({
      origin: [
        'https://tc-store-nestjs.adaptable.app',
        'https://tcstore.vercel.app',
      ],
    });
  } else {
    app.enableCors();
  }

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('TC Store example')
    .setDescription('The TC Store API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
