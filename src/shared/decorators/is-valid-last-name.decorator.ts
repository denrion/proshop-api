import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

export const IsValidLastName = () => {
  return applyDecorators(
    ApiPropertyOptional({ minLength: 2, maxLength: 50 }),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(50),
  );
};
