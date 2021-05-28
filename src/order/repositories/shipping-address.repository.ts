import { EntityRepository } from 'typeorm';
import { ShippingAddressEntity } from '../entities/shipping-address.entity';
import { BaseRepository } from '../../shared/base.repository';

@EntityRepository(ShippingAddressEntity)
export class ShippingAddressRepository extends BaseRepository<ShippingAddressEntity> {}
