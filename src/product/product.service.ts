import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PRODUCT_ALLOWED_SEARCH_FIELDS } from './constants/product-fields';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { BaseRepository, BaseService } from '../shared';

const ENTITY_NAME = 'Product';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(
    @InjectRepository(ProductRepository) public readonly repository: BaseRepository<ProductEntity>,
  ) {
    super(repository, ENTITY_NAME, PRODUCT_ALLOWED_SEARCH_FIELDS);
  }
}
