import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { FunService } from 'src/common/funcService';
import { LIMIT_DATA } from 'src/common/app';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(body: Product): Promise<Product> {
    return FunService.create(this.productModel, body);
  }

  async getProductByLimit(@Query() query): Promise<Product[]> {
    return FunService.getDataByLimit(this.productModel, query);
  }

  async getProductByID(id: string): Promise<Product> {
    return FunService.findDataByID(this.productModel, id);
  }

  async getProductByListID(listId: string[]): Promise<Product[]> {
    const data = await this.productModel.find({
      _id: { $in: listId },
    });
    return data;
  }

  async deleteProductByID(id: string): Promise<Product> {
    return FunService.deleteDataByID(this.productModel, id);
  }

  async updateProduct(id: string, body: Product): Promise<Product> {
    return FunService.updateData(this.productModel, id, body);
  }
}
