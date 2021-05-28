import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseCreateDTO, IsPositiveDecimal, IsPositiveInt } from '../../shared';

export class CreateProductDTO extends BaseCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsPositiveDecimal()
  @IsNotEmpty()
  price: number;

  @IsPositiveInt()
  @IsNotEmpty()
  countInStock: number;
}
