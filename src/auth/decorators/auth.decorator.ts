import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import {
  ForbiddenResponseDTO,
  SwaggerAuthorizationType,
  UnauthorizedResponseDTO,
  UserRole,
} from '../../shared';

export const Auth = (...roles: UserRole[]) => {
  const authDecorators: (ClassDecorator & MethodDecorator)[] = [
    // ApiSecurity(AuthorizationType.API_KEY),
    ApiBearerAuth(SwaggerAuthorizationType.BEARER_TOKEN),
    ApiUnauthorizedResponse({ schema: { $ref: getSchemaPath(UnauthorizedResponseDTO) } }),
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  ];

  if (roles?.length > 0)
    authDecorators.push(
      ApiForbiddenResponse({ schema: { $ref: getSchemaPath(ForbiddenResponseDTO) } }),
    );

  return applyDecorators(...authDecorators);
};
