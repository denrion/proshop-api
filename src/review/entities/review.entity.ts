import { Column, Entity } from 'typeorm';

@Entity()
export class ReviewEntity {
  @Column()
  name: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @Column({ name: 'fk_user_id' })
  fkUserId: number;
}
