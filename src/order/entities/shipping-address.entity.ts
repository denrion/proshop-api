import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../shared';

@Entity('shipping_addresses')
export class ShippingAddressEntity extends AbstractEntity {
  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;
}
