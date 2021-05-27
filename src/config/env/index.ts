import { validate as validateEnv } from './env.validation';
import { databaseConfig, DatabaseConfig } from './database.config';
import { ENV_CONFIG } from './env-config.enum';
import { jwtConfig, JwtConfig } from './jwt.config';
import { serverConfig, ServerConfig } from './server.config';

export {
  serverConfig,
  ServerConfig,
  DatabaseConfig,
  databaseConfig,
  jwtConfig,
  JwtConfig,
  ENV_CONFIG,
  validateEnv,
};
