import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConnectionService } from './database.service';
import { UserSeeder } from './seeders/user.seeder';
import { ProductSeeder } from './seeders/product.seeder';
import { UserRepository } from '../../user/user.repository';
import { ProductRepository } from '../../product/product.repository';
import { ReviewRepository } from '../../review/review.repository';
import { OrderRepository } from '../../order/repositories/order.repository';
import { OrderItemRepository } from '../../order/repositories/order-item.repository';
import { ShippingAddressRepository } from '../../order/repositories/shipping-address.repository';
import { PaymentResultRepository } from '../../order/repositories/payment-result.repository';
import { AppConfigModule } from '../config.module';

seeder({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({ useClass: DBConnectionService }),
    TypeOrmModule.forFeature([
      UserRepository,
      ProductRepository,
      ReviewRepository,
      OrderRepository,
      OrderItemRepository,
      ShippingAddressRepository,
      PaymentResultRepository,
    ]),
  ],
}).run([UserSeeder, ProductSeeder]);
