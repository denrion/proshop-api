import { ProductEntity } from '../entities/product.entity';

type ProductFields = (keyof ProductEntity)[] | string[];

export const PRODUCT_ALLOWED_SEARCH_FIELDS: ProductFields = ['id', 'name', 'description', 'brand'];
export const PRODUCT_ALLOWED_RELATIONS: ProductFields = [];

const commonFields: ProductFields = [
  ...PRODUCT_ALLOWED_SEARCH_FIELDS,
  'image',
  'category',
  'price',
  'countInStock',
  'rating',
  'numReviews',
  'createdAt',
  'updatedAt',
];

export const PRODUCT_ALLOWED_SELECT_FIELDS: ProductFields = [...commonFields];
export const PRODUCT_ALLOWED_SORT_FIELDS: ProductFields = [...commonFields];
