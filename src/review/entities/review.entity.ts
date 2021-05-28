import { Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { AbstractEntity } from '../../shared';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('reviews')
export class ReviewEntity extends AbstractEntity {
  @Column()
  name: string;

  @Type(() => Number)
  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column()
  comment: string;

  @Column({ name: 'fk_user_id' })
  fkUserId: number;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: 'fk_user_id' })
  user: UserEntity;

  @Column({ name: 'fk_product_id' })
  fkProductId: number;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  @JoinColumn({ name: 'fk_product_id' })
  product: ProductEntity;
}
