import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AppConfigService, FastifyService, SwaggerService } from './config';

const swaggerService = new SwaggerService();
const fastifyService = new FastifyService();

const bootstrap = async () => {
  const fastifyHttpAdapter = fastifyService.buildFastifyHttpAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyHttpAdapter);

  const configService = app.get(AppConfigService);
  const { PORT, HOST, API_PREFIX } = configService.serverConfig;

  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix(API_PREFIX);

  fastifyService.registerFastifyPlugins(app);
  swaggerService.setupSwaggerConfig(app);

  await app.listen(PORT, HOST);

  console.info(`Application is running on: ${await app.getUrl()}/${process.env.API_PREFIX}`);
};

bootstrap();
