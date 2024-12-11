import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { JoiValidationPipe } from './validates/joi-validation-pipe.validate';

async function bootstrap() {
  const app = await NestFactory.create<any>(AppModule);

  // Set up the views directory and engine
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs'); // Use Handlebars (or change this to 'ejs' if using EJS)

  // Serve static files from the public directory
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // const uploadPath = join(__dirname, '..', 'uploads');
  // app.use('/uploads', express.static(uploadPath)); // Expose the 'uploads' folder to the URL

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads'))); // set path url

  app.enableCors({
    origin: '*', // or specify your frontend's URL
  });

  // Enable validation pipe globally to validate DTOs
  app.useGlobalPipes(
    new ValidationPipe({ transform: true })
  );

  await app.listen(3000);
}
bootstrap();
