import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderRepository } from './repositories/order.repository';
import { ORDER_ALLOWED_SEARCH_FIELDS } from './constants/orderFields';
import { BaseRepository, BaseService } from '../shared';

const ENTITY_NAME = 'Order';

@Injectable()
export class OrderService extends BaseService<OrderEntity> {
  constructor(
    @InjectRepository(OrderRepository) public readonly repository: BaseRepository<OrderEntity>,
  ) {
    super(repository, ENTITY_NAME, ORDER_ALLOWED_SEARCH_FIELDS);
  }
}
