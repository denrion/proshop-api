import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Type } from 'class-transformer';
import { AbstractEntity } from '../../shared';
import { UserEntity } from '../../user/entities/user.entity';
import { ReviewEntity } from '../../review/entities/review.entity';

@Entity('products')
export class ProductEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column({ nullable: true, default: '' })
  description?: string;

  @Type(() => Number)
  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ name: 'num_reviews', default: 0 })
  numReviews: number;

  @Type(() => Number)
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price: number;

  @Column({ name: 'count_in_stock', default: 0 })
  countInStock: number;

  @Column({ name: 'fk_user_id', nullable: true })
  fkUserId?: number;

  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn({ name: 'fk_user_id' })
  user?: UserEntity;

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];
}
