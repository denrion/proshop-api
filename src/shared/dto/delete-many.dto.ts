import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator';

export class DeleteManyDTO {
  @ArrayNotEmpty()
  @IsArray()
  @IsNotEmpty()
  readonly data: number[] = [];
}
