import { IsOptional } from 'class-validator';
import { FindOneParamsDTO, IsValidId } from '../../shared';

export class FindOneReviewParamsDTO extends FindOneParamsDTO {
  @IsOptional()
  id: number;

  @IsValidId()
  productId: number;
}
