import { EntityRepository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { BaseRepository } from '../../shared/base.repository';

@EntityRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> {}
