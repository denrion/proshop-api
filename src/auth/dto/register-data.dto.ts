import { LoginCredentialsDTO } from './login-credentials.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDataDTO extends LoginCredentialsDTO {
  @IsString()
  @IsNotEmpty()
  readonly name?: string;
}
