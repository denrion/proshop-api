import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const IsValidEmail = () => {
  return applyDecorators(
    ApiProperty({ minLength: 4, maxLength: 50 }),
    IsNotEmpty(),
    IsString(),
    IsEmail(),
    MinLength(4),
    MaxLength(50),
    Transform(({ value }) => value.toLowerCase()),
  );
};
