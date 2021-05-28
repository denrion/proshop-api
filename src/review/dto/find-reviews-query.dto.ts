import { IntersectionType } from '@nestjs/swagger';
import { UpdateReviewDTO } from './update-review.dto';
import {
  REVIEW_ALLOWED_SELECT_FIELDS,
  REVIEW_ALLOWED_SORT_FIELDS,
  REVIEW_ALLOWED_RELATIONS,
} from '../constants/reviewFields';
import { FindAllQueryDTO } from '../../shared';

export class FindReviewsQueryDTO extends IntersectionType(
  FindAllQueryDTO(
    REVIEW_ALLOWED_SELECT_FIELDS,
    REVIEW_ALLOWED_SORT_FIELDS,
    REVIEW_ALLOWED_RELATIONS,
  ),
  UpdateReviewDTO,
) {}
