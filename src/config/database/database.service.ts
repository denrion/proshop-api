import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import './hms-query-builder';
import { AppConfigService } from '../config.service';

@Injectable()
export class DBConnectionService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: AppConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig = this.configService.databaseConfig;
    const isProduction = this.configService.isProduction;
    const isLocalDB = this.configService.isLocalDB;

    return {
      name: dbConfig.DB_CONNECTION_NAME,
      type: 'postgres',
      url: dbConfig.DB_URL,
      autoLoadEntities: true,
      synchronize: !isProduction,
      logging: !isProduction,
      ssl: isLocalDB ? null : { rejectUnauthorized: false },
      dropSchema: false,
    };
  }
}
