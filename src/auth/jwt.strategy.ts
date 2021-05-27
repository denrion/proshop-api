import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { AppConfigService } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtConfig.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Not authenticated. Please login!');
    }

    return user;
  }
}
