export const JwtConstants = {
  secret: process.env.SECRET_KEY_JWT,
  expiredAccess: '2hours',
  expiredRefresh: '15day',
} as const;

export const LIMIT_DATA = 20 as const;

export const MathSort = {
  asc: 'asc',
  desc: 'desc',
};
