import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDataDTO } from './dto/register-data.dto';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';
import { AuthResponseDTO } from './dto/auth-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async register(registerDataDto: RegisterDataDTO): Promise<AuthResponseDTO> {
    const user = await this.userService.create(registerDataDto);

    return new AuthResponseDTO({ accessToken: this.signToken(user), user });
  }

  async login(loginCredentialsDto: LoginCredentialsDTO): Promise<AuthResponseDTO> {
    const { email, password } = loginCredentialsDto;

    const user = await this.userService.findByEmail(email);

    if (!user || !(await user.isCorrectPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return new AuthResponseDTO({ accessToken: this.signToken(user), user });
  }

  private signToken = (user: UserEntity): string => {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  };
}
