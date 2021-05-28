import { IntersectionType } from '@nestjs/swagger';
import { UpdateOrderDTO } from './update-order.dto';
import {
  ORDER_ALLOWED_SELECT_FIELDS,
  ORDER_ALLOWED_SORT_FIELDS,
  ORDER_ALLOWED_RELATIONS,
} from '../constants/orderFields';
import { FindAllQueryDTO } from '../../shared';

export class FindOrdersQueryDTO extends IntersectionType(
  FindAllQueryDTO(ORDER_ALLOWED_SELECT_FIELDS, ORDER_ALLOWED_SORT_FIELDS, ORDER_ALLOWED_RELATIONS),
  UpdateOrderDTO,
) {}
