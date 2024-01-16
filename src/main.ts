import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Jask API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const swaggerOptions: SwaggerCustomOptions = {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
    },
  };
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document , swaggerOptions);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
