import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';

export class JwtConfig {
  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;
}

export const jwtConfig = registerAs(
  'jwt',
  (): JwtConfig => ({
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  }),
);
