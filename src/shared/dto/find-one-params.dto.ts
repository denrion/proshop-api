import { IsNotEmpty } from 'class-validator';
import { IsValidId } from '../decorators';

export class FindOneParamsDTO {
  @IsValidId()
  @IsNotEmpty()
  id: number;
}
