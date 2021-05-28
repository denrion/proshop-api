import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../shared';

@Entity('payment_results')
export class PaymentResultEntity extends AbstractEntity {
  @Column()
  status: string;

  @Column({ name: 'update_time' })
  updateTime: string;

  @Column({ name: 'email_address' })
  emailAddress: string;
}
