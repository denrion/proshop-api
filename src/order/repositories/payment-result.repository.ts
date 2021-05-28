import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../shared/base.repository';
import { PaymentResultEntity } from '../entities/payment-result.entity';

@EntityRepository(PaymentResultEntity)
export class PaymentResultRepository extends BaseRepository<PaymentResultEntity> {}
