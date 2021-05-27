import { IsNotEmpty, IsString } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { StrongPassword } from './strong-password.decorator';

export const IsValidPassword = () => {
  return applyDecorators(IsNotEmpty(), IsString(), StrongPassword());
};
