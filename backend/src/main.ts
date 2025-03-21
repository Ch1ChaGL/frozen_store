import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // для тестов можно разрешить все домены
    credentials: true,
  });

  await app.listen(4200);
}
bootstrap().then(() => console.log('server start on 4200'));
