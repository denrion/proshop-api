import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from './env';
import { DatabaseConfig } from './env/database.config';
import { ENV_CONFIG } from './env/env-config.enum';
import { ServerConfig } from './env/server.config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  get isLocalDB(): boolean {
    return this.configService.get<string>('DB_HOST') === 'localhost';
  }

  get serverConfig(): ServerConfig {
    return this.configService.get<ServerConfig>(ENV_CONFIG.SERVER);
  }

  get databaseConfig(): DatabaseConfig {
    return this.configService.get<DatabaseConfig>(ENV_CONFIG.DATABASE);
  }

  get jwtConfig(): JwtConfig {
    return this.configService.get<JwtConfig>(ENV_CONFIG.JWT);
  }
}
