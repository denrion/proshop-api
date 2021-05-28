import { UserEntity } from '../entities/user.entity';

type UserFields = (keyof UserEntity)[] | string[];

export const USER_ALLOWED_SEARCH_FIELDS: UserFields = ['id', 'email', 'firstName', 'lastName'];
export const USER_ALLOWED_RELATIONS: UserFields = ['products', 'reviews', 'orders'];

const commonFields: UserFields = [...USER_ALLOWED_SEARCH_FIELDS, 'updatedAt', 'createdAt'];

export const USER_ALLOWED_SELECT_FIELDS: UserFields = [...commonFields];
export const USER_ALLOWED_SORT_FIELDS: UserFields = [...commonFields];
