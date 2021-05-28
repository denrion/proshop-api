import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseCreateDTO, IsValidEmail, IsValidPassword } from '../../shared';

export class CreateUserDTO extends BaseCreateDTO {
  @IsValidEmail()
  readonly email: string;

  @IsValidPassword()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly role?: string;
}
