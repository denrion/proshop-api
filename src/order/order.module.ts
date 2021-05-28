import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ShippingAddressRepository } from './repositories/shipping-address.repository';
import { OrderItemRepository } from './repositories/order-item.repository';
import { PaymentResultRepository } from './repositories/payment-result.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderItemRepository,
      ShippingAddressRepository,
      PaymentResultRepository,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
