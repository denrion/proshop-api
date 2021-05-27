import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { applyDecorators } from '@nestjs/common';

export const IsPositiveInt = () => {
  return applyDecorators(
    IsPositive(),
    IsInt(),
    Type(() => Number),
  );
};
