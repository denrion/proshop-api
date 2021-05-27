import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, Request } from '../../shared';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    const isAllowed = this.matchRoles(roles, user.role);

    if (!isAllowed) {
      throw new ForbiddenException('No permission to perform this action');
    }

    return isAllowed;
  }

  private matchRoles(allowedRoles: UserRole[], userRole: UserRole) {
    return allowedRoles.includes(userRole);
  }
}
