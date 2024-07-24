import { Injectable, Param, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { MATH_DB } from 'src/common/mongoDB';
import { lowercase } from 'src/utils/function';
import { MATH_SORT } from 'src/common/app';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(body: Product): Promise<Product> {
    return FunService.create(this.productModel, body);
  }

  async deleteProductByID(@Param() param): Promise<Product | null> {
    return FunService.deleteDataByID(
      this.productModel,
      new Types.ObjectId(param.id),
    );
  }

  async deleteManyProduct(listId: string[]): Promise<Product | null> {
    const filter = {
      id: { [MATH_DB.$in]: listId },
    };
    return FunService.deleteManyData(this.productModel, filter);
  }

  async updateProduct(id: string, body: Product): Promise<Product | null> {
    return FunService.updateData(this.productModel, id, body);
  }

  async getProductByID(id: string): Promise<Product | null> {
    return FunService.findDataByID(this.productModel, id);
  }

  async getProductByKeyName(keyName: string): Promise<Product | null> {
    return FunService.getOneData(this.productModel, { keyName });
  }

  async getProductByTypeProduct(@Query() query): Promise<Product[]> {
    if (!query.category || lowercase(query.category) === 'all') {
      return FunService.getDataByLimit(this.productModel, query);
    }
    let listType: string[] = query.category.split(',');
    listType = listType.map((e) => lowercase(e));
    const dataFilter = await FunService.getAndSortDataByOptions(
      this.productModel,
      query,
      {
        category: { [MATH_DB.$in]: listType },
      },
      {},
      {
        price: query.sort ? (query.sort === MATH_SORT.asc ? 1 : -1) : 1,
      },
    );

    return dataFilter;
  }

  async getProductByListID(listId: Types.ObjectId[]): Promise<Product[]> {
    const data = await this.productModel.find({
      _id: { $in: listId },
    });
    return data;
  }
}
