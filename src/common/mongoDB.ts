export enum DB_COLLECTION {
  User = 'User',
  Production = 'Production',
  Comment = 'Comment',
  CartUser = 'CartUser',
  Category = 'TypeProduct',
  Bill = 'Bill',
  ContactMe = 'ContactMe',
  MyService = 'MyService',
}

export enum PATH_IMG {
  MyService = 'my-services',
  Users = 'users',
  Comment = 'comment',
  Products = 'products',
  ContactMe = 'contact-me',
}

export const DB_NAME = 'tc-store';

export enum MATH_DB {
  $in = '$in',
  $gt = '$gt',
  $gte = '$gte',
  $lt = '$lt',
  $nor = '$nor',
  $and = '$and',
  $or = '$or',
  $where = '$where',
  $MergeObjects = '$mergeObjects',
}
