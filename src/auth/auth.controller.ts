import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { RegisterDataDTO } from './dto/register-data.dto';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';
import { AuthResponseDTO } from './dto/auth-response.dto';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { ApiCreatedSuccessResponse, ApiOkSuccessResponse } from '../shared';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedSuccessResponse(AuthResponseDTO)
  @Post('/register')
  async register(@Body() registerDataDto: RegisterDataDTO): Promise<AuthResponseDTO> {
    return this.authService.register(registerDataDto);
  }

  @ApiOkSuccessResponse(AuthResponseDTO)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginCredentialsDto: LoginCredentialsDTO): Promise<AuthResponseDTO> {
    return this.authService.login(loginCredentialsDto);
  }

  @ApiOkSuccessResponse(UserEntity)
  @Auth()
  @Get('/me')
  getCurrentUser(@User() user: UserEntity): UserEntity {
    return user;
  }
}
