import { EntityRepository } from 'typeorm';
import { OrderItemEntity } from '../entities/order-item.entity';
import { BaseRepository } from '../../shared/base.repository';

@EntityRepository(OrderItemEntity)
export class OrderItemRepository extends BaseRepository<OrderItemEntity> {}
