import { Matches, MaxLength, MinLength } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const passwordPattern = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const StrongPassword = () => {
  return applyDecorators(
    ApiProperty({
      minLength: 8,
      maxLength: 20,
      pattern: `${passwordPattern}`,
    }),
    MinLength(8),
    MaxLength(20),
    Matches(passwordPattern, {
      message:
        'Password must contain at least one number, one lowercase character and one uppercase character',
    }),
  );
};
