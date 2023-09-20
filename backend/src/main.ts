import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const options: CorsOptions = {
    origin: config.getOrThrow<string>('ALLOWED_ORIGINS').split(','),
    credentials: true,
  };
  app.enableCors(options);
  app.use(cookieParser());
  await app.listen(process.env.PORT || 6060);
}
bootstrap();
