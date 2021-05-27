import compression from 'fastify-compress';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import rateLimit from 'fastify-rate-limit';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../config.service';

@Injectable()
export class FastifyService {
  buildFastifyHttpAdapter = () => {
    return new FastifyAdapter({
      ignoreTrailingSlash: true,
      caseSensitive: true,
      bodyLimit: +process.env.FASTIFY_BODY_SIZE_LIMIT,
      maxParamLength: +process.env.FASTIFY_MAX_PARAM_LENGTH,
      trustProxy: process.env.HOST_NAME === 'Heroku', // Enable https over Heroku: https://www.fastify.io/docs/latest/Server/#trustproxy,
      logger: { prettyPrint: true },
    });
  };

  registerFastifyPlugins = (app: NestFastifyApplication) => {
    const configService = app.get(AppConfigService);
    const { FASTIFY_RATE_LIMIT_MAX_NUM_CONNECTIONS, FASTIFY_RATE_LIMIT_TIME_WINDOW_MS } =
      configService.serverConfig;

    // https://docs.nestjs.com/techniques/security#helmet
    // https://github.com/fastify/fastify-helmet
    app.register(helmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    });

    // https://github.com/fastify/fastify-cors
    app.register(cors, { origin: '*' });

    // https://docs.nestjs.com/techniques/security#rate-limiting
    // https://github.com/fastify/fastify-rate-limit
    app.register(rateLimit, {
      max: FASTIFY_RATE_LIMIT_MAX_NUM_CONNECTIONS,
      timeWindow: FASTIFY_RATE_LIMIT_TIME_WINDOW_MS,
    });

    // https://docs.nestjs.com/techniques/compression#use-with-fastify
    // https://github.com/fastify/fastify-compress
    app.register(compression, { encodings: ['gzip', 'deflate'] });
  };
}
