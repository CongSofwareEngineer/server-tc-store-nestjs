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
  $regex = '$regex',
}

const FILTER_BASE_DB = {
  id: 'id',
};

export const OPTION_FILTER_DB = {
  Poduct: {
    ...FILTER_BASE_DB,
    keyName: 'keyName',
  },
  Bill: {
    ...FILTER_BASE_DB,
    type: 'type',
    date: 'date',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd',
    sdt: 'sdt',
    status: 'status',
    idUser: 'idUser',
  },
  User: {
    ...FILTER_BASE_DB,
    sdt: 'sdt',
    isAdmin: 'isAdmin',
  },
  Cart: {
    ...FILTER_BASE_DB,
    date: 'date',
    sdt: 'sdt',
  },
  Comment: {
    ...FILTER_BASE_DB,
    date: 'date',
    sdt: 'sdt',
    idProduct: 'idProduct',
  },
  Revenue: {
    ...FILTER_BASE_DB,
    date: 'date',
    dateRange: 'dateRange',
    sdt: 'sdt',
    idProduct: 'idProduct',
  },
};

export enum KEY_OPTION_FILTER_DB {
  Poduct = 'Poduct',
  Bill = 'Bill',
  Revenue = 'Revenue',
  User = 'User',
  Cart = 'Cart',
  Comment = 'Comment',
}
