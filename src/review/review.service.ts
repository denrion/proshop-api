import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REVIEW_ALLOWED_SEARCH_FIELDS } from './constants/reviewFields';
import { ReviewEntity } from './entities/review.entity';
import { ReviewRepository } from './review.repository';
import { BaseRepository, BaseService } from '../shared';

const ENTITY_NAME = 'Review';

@Injectable()
export class ReviewService extends BaseService<ReviewEntity> {
  constructor(
    @InjectRepository(ReviewRepository) public readonly repository: BaseRepository<ReviewEntity>,
  ) {
    super(repository, ENTITY_NAME, REVIEW_ALLOWED_SEARCH_FIELDS);
  }
}
