import { IntersectionType } from '@nestjs/swagger';
import { UpdateOrderDTO } from './update-order.dto';
import { ORDER_ALLOWED_SELECT_FIELDS, ORDER_ALLOWED_RELATIONS } from '../constants/orderFields';
import { FindOneQueryDTO } from '../../shared';

export class FindOneOrderQueryDTO extends IntersectionType(
  FindOneQueryDTO(ORDER_ALLOWED_SELECT_FIELDS, ORDER_ALLOWED_RELATIONS),
  UpdateOrderDTO,
) {
  readonly relations = ORDER_ALLOWED_RELATIONS;
}
