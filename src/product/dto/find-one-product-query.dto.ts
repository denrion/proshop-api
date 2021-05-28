import { IntersectionType } from '@nestjs/swagger';
import { UpdateProductDTO } from './update-product.dto';
import {
  PRODUCT_ALLOWED_RELATIONS,
  PRODUCT_ALLOWED_SELECT_FIELDS,
} from '../constants/product-fields';
import { FindOneQueryDTO } from '../../shared';

export class FindOneProductQueryDTO extends IntersectionType(
  FindOneQueryDTO(PRODUCT_ALLOWED_SELECT_FIELDS, PRODUCT_ALLOWED_RELATIONS),
  UpdateProductDTO,
) {
  readonly relations = PRODUCT_ALLOWED_RELATIONS;
}
