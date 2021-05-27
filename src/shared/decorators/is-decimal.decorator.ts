import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';
import { applyDecorators } from '@nestjs/common';

export const IsDecimal = () => {
  return applyDecorators(
    IsPositive(),
    IsNumber(),
    Type(() => Number),
  );
};
