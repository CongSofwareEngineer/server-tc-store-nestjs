import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { FunService } from 'src/common/funcService';
import { MathDB } from 'src/common/mongoDB';
import { lowercase } from 'src/utils/function';
import { MathSort } from 'src/common/app';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(body: Product): Promise<Product> {
    return FunService.create(this.productModel, body);
  }

  async deleteProductByID(id: string): Promise<Product> {
    return FunService.deleteDataByID(this.productModel, id);
  }

  async updateProduct(id: string, body: Product): Promise<Product> {
    return FunService.updateData(this.productModel, id, body);
  }

  async getProductByID(id: string): Promise<Product> {
    return FunService.findDataByID(this.productModel, id);
  }

  async getProductByTypeProduct(@Query() query): Promise<Product[]> {
    if (!query.typeProduct || lowercase(query.typeProduct) === 'all') {
      return FunService.getDataByLimit(this.productModel, query);
    }
    let listType: string[] = query.typeProduct.split(',');
    listType = listType.map((e) => lowercase(e));
    const dataFilter = await FunService.findAndSortDataByOptions(
      this.productModel,
      query,
      {
        typeProduct: { [MathDB.$in]: listType },
      },
      {},
      {
        price: query.sort ? (query.sort === MathSort.asc ? 1 : -1) : 1,
      },
    );

    return dataFilter;
  }

  async getProductByListID(listId: string[]): Promise<Product[]> {
    const data = await this.productModel.find({
      _id: { $in: listId },
    });
    return data;
  }
}
