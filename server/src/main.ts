import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [`${process.env.CLIENT_URL}` || 'http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  await app.listen(3000);
  console.log('server listen 3000');
}
bootstrap();
