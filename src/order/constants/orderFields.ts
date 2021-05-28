import { OrderEntity } from '../entities/order.entity';

type OrderFields = (keyof OrderEntity)[] | string[];

export const ORDER_ALLOWED_SEARCH_FIELDS: OrderFields = ['id', 'totalPrice'];
export const ORDER_ALLOWED_RELATIONS: OrderFields = [
  'paymentResult',
  'shippingAddress',
  'user',
  'orderItems',
];

const commonFields: OrderFields = [
  ...ORDER_ALLOWED_SEARCH_FIELDS,
  'taxPrice',
  'shippingPrice',
  'isPaid',
  'paidAt',
  'isDelivered',
  'deletedAt',
  'paymentMethod',
  'createdAt',
  'updatedAt',
];

export const ORDER_ALLOWED_SELECT_FIELDS: OrderFields = [...commonFields];
export const ORDER_ALLOWED_SORT_FIELDS: OrderFields = [...commonFields];
