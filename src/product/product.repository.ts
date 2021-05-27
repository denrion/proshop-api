import { EntityRepository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { BaseRepository } from '../shared';

@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {}
