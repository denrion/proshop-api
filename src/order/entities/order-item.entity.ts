import { Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { AbstractEntity } from '../../shared';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  image: string;

  @Type(() => Number)
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  price: number;

  @Column({ name: 'fk_product_id' })
  fkProductId: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'fk_product_id' })
  product: ProductEntity;

  @Column({ name: 'fk_order_id' })
  fkOrderId: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: 'fk_order_id' })
  order: OrderEntity;
}
