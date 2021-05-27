import { IsValidEmail, IsValidPassword } from '../../shared';

export class LoginCredentialsDTO {
  @IsValidEmail()
  email: string;

  @IsValidPassword()
  password: string;
}
