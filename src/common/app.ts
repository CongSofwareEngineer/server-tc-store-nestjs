export const JwtConstants = {
  secret: process.env.SECRET_KEY_JWT,
  expiredAccess: '2hours',
  expiredRefresh: '15day',
} as const;

export const LIMIT_DATA = 20 as const;

export const MATH_SORT = {
  asc: 'asc',
  desc: 'desc',
};

export enum FILTER_BILL {
  'All' = 'all',
  'Processing' = 'processing',
  'Delivering' = 'delivering',
  'DeliverySuccess' = 'deliverySuccess',
  'Canceled' = 'canceled',
}
