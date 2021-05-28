import { IntersectionType } from '@nestjs/swagger';
import { UpdateProductDTO } from './update-product.dto';
import {
  PRODUCT_ALLOWED_RELATIONS,
  PRODUCT_ALLOWED_SELECT_FIELDS,
  PRODUCT_ALLOWED_SORT_FIELDS,
} from '../constants/product-fields';
import { FindAllQueryDTO } from '../../shared';

export class FindProductsQueryDTO extends IntersectionType(
  FindAllQueryDTO(
    PRODUCT_ALLOWED_SELECT_FIELDS,
    PRODUCT_ALLOWED_SORT_FIELDS,
    PRODUCT_ALLOWED_RELATIONS,
  ),
  UpdateProductDTO,
) {}
