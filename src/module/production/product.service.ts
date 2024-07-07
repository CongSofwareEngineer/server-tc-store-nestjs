import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(body: Product): Promise<Product> {
    const data = await this.productModel.create(body);
    return data;
  }

  async getProductByLimit(@Query() query): Promise<Product[]> {
    const { page = 1, limit = 1 } = query;
    const skip = (page - 1) * limit;
    const data = await this.productModel.find().skip(skip).limit(limit).exec();
    return data;
  }

  async getProductByID(id: string): Promise<Product> {
    const data = await this.productModel.findById(id).exec();
    return data;
  }

  async deleteProductByID(id: string): Promise<Product> {
    const data = await this.productModel.findByIdAndDelete(id).exec();
    return data;
  }

  async updateProduct(id: string, body: Product): Promise<Product> {
    const data = await this.productModel.findByIdAndUpdate(id, body).exec();
    return data;
  }
}
