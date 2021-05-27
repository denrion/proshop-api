import { IntersectionType } from '@nestjs/swagger';
import { UpdateUserDTO } from './update-user.dto';
import {
  USER_ALLOWED_RELATIONS,
  USER_ALLOWED_SELECT_FIELDS,
  USER_ALLOWED_SORT_FIELDS,
} from '../constants/user-fields';
import { FindAllQueryDTO } from '../../shared';

export class FindUsersQueryDTO extends IntersectionType(
  FindAllQueryDTO(USER_ALLOWED_SELECT_FIELDS, USER_ALLOWED_SORT_FIELDS, USER_ALLOWED_RELATIONS),
  UpdateUserDTO,
) {}
