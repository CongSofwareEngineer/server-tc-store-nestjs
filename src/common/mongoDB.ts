export enum DB_COLLECTION {
  User = 'User',
  Production = 'Production',
  Comment = 'Comment',
  CartUser = 'CartUser',
  Category = 'TypeProduct',
  SubCategories = 'SubCategories',
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
  Category = 'category',
}

export const DB_NAME = 'tc-store';

export enum MATH_DB {
  $all = '$all',
  $in = '$in',
  $gt = '$gt',
  // >=
  $gte = '$gte',
  // <=
  $lte = '$lte',
  $lt = '$lt',
  $nor = '$nor',
  $and = '$and',
  $or = '$or',
  $where = '$where',
  $MergeObjects = '$mergeObjects',
  $regex = '$regex',
  $elemMatch = '$elemMatch',
}

const FILTER_BASE_DB = {
  id: 'id',
  sdt: 'sdt',
};

export enum KEY_OPTION_FILTER_DB {
  Product = 'Product',
  Bill = 'Bill',
  Revenue = 'Revenue',
  User = 'User',
  Cart = 'Cart',
  Comment = 'Comment',
}

export const OPTION_FILTER_DB = {
  [KEY_OPTION_FILTER_DB.Product]: {
    ...FILTER_BASE_DB,
    keyName: 'keyName',
  },
  [KEY_OPTION_FILTER_DB.Bill]: {
    ...FILTER_BASE_DB,
    type: 'type',
    date: 'date',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd',
    status: 'status',
    idUser: 'idUser',
  },
  [KEY_OPTION_FILTER_DB.User]: {
    ...FILTER_BASE_DB,
    isAdmin: 'isAdmin',
  },
  [KEY_OPTION_FILTER_DB.Cart]: {
    ...FILTER_BASE_DB,
    date: 'date',
  },
  [KEY_OPTION_FILTER_DB.Comment]: {
    ...FILTER_BASE_DB,
    date: 'date',
    idProduct: 'idProduct',
  },
  [KEY_OPTION_FILTER_DB.Revenue]: {
    ...FILTER_BASE_DB,
    date: 'date',
    dateRange: 'dateRange',
    idProduct: 'idProduct',
  },
};

export const DEFAULT_SIZE_SHOES = {
  Shoes: {
    minSize: 29,
    maxSize: 45,
  },
  Price: {
    min: 100000,
    max: 5000000,
  },
};
