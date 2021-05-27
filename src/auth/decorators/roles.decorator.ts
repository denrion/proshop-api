import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../shared';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
