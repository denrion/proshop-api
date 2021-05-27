import { LoginCredentialsDTO } from './login-credentials.dto';
import { IsValidFirstName, IsValidLastName } from '../../shared';

export class RegisterDataDTO extends LoginCredentialsDTO {
  @IsValidFirstName()
  readonly firstName?: string;

  @IsValidLastName()
  readonly lastName?: string;
}
