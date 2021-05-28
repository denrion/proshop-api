import { Max, Min } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { IsPositiveDecimal } from '../../shared/decorators/is-positive-decimal.decorator';

export const IsValidRating = () => {
  return applyDecorators(Max(5), Min(1), IsPositiveDecimal());
};
