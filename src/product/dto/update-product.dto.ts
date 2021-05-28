import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateProductDTO } from './create-product.dto';
import { BaseUpdateDTO } from '../../shared';

export class UpdateProductDTO extends IntersectionType(
  BaseUpdateDTO,
  PartialType(CreateProductDTO),
) {}
