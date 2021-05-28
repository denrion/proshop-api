import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Type } from 'class-transformer';
import { OrderItemEntity } from './order-item.entity';
import { ShippingAddressEntity } from './shipping-address.entity';
import { PaymentResultEntity } from './payment-result.entity';
import { AbstractEntity } from '../../shared';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('orders')
export class OrderEntity extends AbstractEntity {
  @Type(() => Number)
  @Column({ name: 'tax_price', type: 'decimal', precision: 12, scale: 2, default: 0 })
  taxPrice: number;

  @Type(() => Number)
  @Column({ name: 'shipping_price', type: 'decimal', precision: 12, scale: 2, default: 0 })
  shippingPrice: number;

  @Type(() => Number)
  @Column({ name: 'total_price', type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalPrice: number;

  @Column({ name: 'is_paid', default: false })
  isPaid: boolean;

  @Column({ name: 'paid_at', nullable: true })
  paidAt?: Date;

  @Column({ name: 'is_delivered', default: false })
  isDelivered: boolean;

  @Column({ name: 'delivered_at', nullable: true })
  deliveredAt?: Date;

  @Column()
  paymentMethod: string;

  @Column({ name: 'fk_payment_result' })
  fkPaymentResultId: number;

  @OneToOne(() => PaymentResultEntity)
  @JoinColumn({ name: 'fk_payment_result' })
  paymentResult: PaymentResultEntity;

  @Column({ name: 'fk_shipping_address_id' })
  fkShippingAddressId: number;

  @OneToOne(() => ShippingAddressEntity)
  @JoinColumn({ name: 'fk_shipping_address_id' })
  shippingAddress: ShippingAddressEntity;

  @Column({ name: 'fk_user_id', nullable: true })
  fkUserId: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'fk_user_id' })
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];
}
