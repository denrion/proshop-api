import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateReviewDTO } from './create-review.dto';
import { BaseUpdateDTO } from '../../shared';

export class UpdateReviewDTO extends IntersectionType(
  BaseUpdateDTO,
  PartialType(CreateReviewDTO),
) {}
