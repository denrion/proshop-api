import { IntersectionType } from '@nestjs/swagger';
import { UpdateReviewDTO } from './update-review.dto';
import { REVIEW_ALLOWED_SELECT_FIELDS, REVIEW_ALLOWED_RELATIONS } from '../constants/reviewFields';
import { FindOneQueryDTO } from '../../shared';

export class FindOneReviewQueryDTO extends IntersectionType(
  FindOneQueryDTO(REVIEW_ALLOWED_SELECT_FIELDS, REVIEW_ALLOWED_RELATIONS),
  UpdateReviewDTO,
) {
  readonly relations = REVIEW_ALLOWED_RELATIONS;
}
