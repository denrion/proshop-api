import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ENVException } from './env.exception';
import { DatabaseConfig } from './database.config';
import { JwtConfig } from './jwt.config';
import { ServerConfig } from './server.config';

export const validate = (config: Record<string, unknown>) => {
  const configsToValidate = [DatabaseConfig, JwtConfig, ServerConfig];
  let errors = [];

  configsToValidate.forEach((c: any) => {
    const validatedConfig: Record<string, unknown> = plainToClass(c, config, {
      enableImplicitConversion: true,
    });

    const validationErrors = validateSync(validatedConfig, { skipMissingProperties: false });

    errors = [...errors, ...validationErrors];
  });

  if (errors.length > 0) {
    throw new ENVException(errors);
  }

  return configsToValidate;
};
