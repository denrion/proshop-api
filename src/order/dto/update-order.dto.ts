import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateOrderDTO } from './create-order.dto';
import { BaseUpdateDTO } from '../../shared';

export class UpdateOrderDTO extends IntersectionType(BaseUpdateDTO, PartialType(CreateOrderDTO)) {}
