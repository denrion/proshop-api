import { ReviewEntity } from '../entities/review.entity';

type ReviewFields = (keyof ReviewEntity)[] | string[];

export const REVIEW_ALLOWED_SEARCH_FIELDS: ReviewFields = ['id', 'name', 'comment'];
export const REVIEW_ALLOWED_RELATIONS: ReviewFields = ['user', 'product'];

const commonFields: ReviewFields = [
  ...REVIEW_ALLOWED_SEARCH_FIELDS,
  'rating',
  'createdAt',
  'updatedAt',
];

export const REVIEW_ALLOWED_SELECT_FIELDS: ReviewFields = [...commonFields];
export const REVIEW_ALLOWED_SORT_FIELDS: ReviewFields = [...commonFields];
