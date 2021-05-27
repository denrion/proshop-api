import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import { BaseUpdateDTO } from '../../shared';

export class UpdateUserDTO extends PartialType(
  IntersectionType(BaseUpdateDTO, OmitType(CreateUserDTO, ['password'] as const)),
) {}
