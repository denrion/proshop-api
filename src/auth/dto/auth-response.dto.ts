import { UserEntity } from '../../user/entities/user.entity';

export class AuthResponseDTO {
  accessToken: string;
  user: UserEntity;

  constructor(partial: Partial<AuthResponseDTO>) {
    Object.assign(this, partial);
  }
}
