import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

export const IsValidFirstName = () => {
  return applyDecorators(
    ApiPropertyOptional({ minLength: 2, maxLength: 30 }),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(30),
  );
};
