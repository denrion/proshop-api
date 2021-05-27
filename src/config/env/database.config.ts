import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DatabaseConfig {
  @IsString()
  @IsOptional()
  DB_CONNECTION_NAME: string;

  @IsString()
  @IsOptional()
  DB_HOST?: string;

  @IsNumber()
  @IsOptional()
  DB_PORT?: number;

  @IsString()
  @IsOptional()
  DB_USER?: string;

  @IsString()
  @IsOptional()
  DB_PASSWORD?: string;

  @IsString()
  @IsOptional()
  DB_NAME?: string;

  @IsString()
  @IsNotEmpty()
  DB_URL: string;
}

export const databaseConfig = registerAs(
  'database',
  (): DatabaseConfig => ({
    DB_CONNECTION_NAME: process.env.DB_CONNECTION_NAME ?? 'default',
    DB_HOST: process.env.DB_HOST,
    DB_PORT: +process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_URL: process.env.DB_URL,
  }),
);
