import { registerAs } from '@nestjs/config';
import { IsEnum, IsNumber, IsString } from 'class-validator';

enum NODE_ENVIRONMENT {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
}

export class ServerConfig {
  // ENV_SERVER
  @IsEnum(NODE_ENVIRONMENT, {
    message: `NODE_ENV must have one of the following values: ${Object.values(NODE_ENVIRONMENT)}`,
  })
  NODE_ENV: NODE_ENVIRONMENT | string;

  @IsNumber()
  PORT: number;

  @IsString()
  HOST: string;

  @IsNumber()
  FASTIFY_BODY_SIZE_LIMIT: number;

  @IsNumber()
  FASTIFY_MAX_PARAM_LENGTH: number;

  @IsNumber()
  FASTIFY_RATE_LIMIT_MAX_NUM_CONNECTIONS: number;

  @IsNumber()
  FASTIFY_RATE_LIMIT_TIME_WINDOW_MS: number;

  @IsString()
  API_PREFIX: string;
}

export const serverConfig = registerAs(
  'server',
  (): ServerConfig => ({
    NODE_ENV: process.env.NODE_ENV,
    PORT: +process.env.PORT,
    HOST: process.env.HOST,
    FASTIFY_BODY_SIZE_LIMIT: +process.env.FASTIFY_BODY_SIZE_LIMIT,
    FASTIFY_MAX_PARAM_LENGTH: +process.env.FASTIFY_MAX_PARAM_LENGTH,
    FASTIFY_RATE_LIMIT_MAX_NUM_CONNECTIONS: +process.env.FASTIFY_RATE_LIMIT_MAX_NUM_CONNECTIONS,
    FASTIFY_RATE_LIMIT_TIME_WINDOW_MS: +process.env.FASTIFY_RATE_LIMIT_TIME_WINDOW_MS,
    API_PREFIX: process.env.API_PREFIX,
  }),
);
