import { IntersectionType } from '@nestjs/swagger';
import { UpdateUserDTO } from './update-user.dto';
import { USER_ALLOWED_RELATIONS, USER_ALLOWED_SELECT_FIELDS } from '../constants/user-fields';
import { FindOneQueryDTO } from '../../shared';

export class FindOneUserQueryDTO extends IntersectionType(
  FindOneQueryDTO(USER_ALLOWED_SELECT_FIELDS, USER_ALLOWED_RELATIONS),
  UpdateUserDTO,
) {
  readonly relations = USER_ALLOWED_RELATIONS;
}
