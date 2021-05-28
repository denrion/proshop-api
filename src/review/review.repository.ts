import { EntityRepository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { BaseRepository } from '../shared/base.repository';

@EntityRepository(ReviewEntity)
export class ReviewRepository extends BaseRepository<ReviewEntity> {}
