import { Max, Min } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsPositiveInt } from './is-positive-int.decorator';

const MIN_VALUE = 1;
const MAX_VALUE = 999999999;

export const IsValidId = () => {
  return applyDecorators(
    ApiProperty({ minimum: MIN_VALUE, maximum: MAX_VALUE }),
    Min(MIN_VALUE),
    Max(MAX_VALUE),
    IsPositiveInt(),
  );
};
