import {
  BaseCreateDTO,
  IsValidEmail,
  IsValidFirstName,
  IsValidLastName,
  IsValidPassword,
} from '../../shared';

export class CreateUserDTO extends BaseCreateDTO {
  @IsValidEmail()
  readonly email: string;

  @IsValidPassword()
  readonly password: string;

  @IsValidFirstName()
  readonly firstName?: string;

  @IsValidLastName()
  readonly lastName?: string;
}
