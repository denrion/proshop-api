import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidRating } from '../decorators/is-valid-rating.decorator';
import { BaseCreateDTO, IsValidId } from '../../shared';

export class CreateReviewDTO extends BaseCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsValidRating()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsValidId()
  @IsNotEmpty()
  fkUserId: number;

  @IsValidId()
  @IsNotEmpty()
  fkProductId: number;
}
