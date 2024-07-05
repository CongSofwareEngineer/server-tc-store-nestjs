import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TypeProduct } from './schemas/typeProduct.schema';

@Injectable()
export class TypeProductService {
  constructor(
    @InjectModel(TypeProduct.name) private typeProductModel: Model<TypeProduct>,
  ) {}

  async getAllType(): Promise<TypeProduct[]> {
    return this.typeProductModel.find().exec();
  }

  async getTypeByLimit(page: number, limit: number): Promise<TypeProduct[]> {
    const skip = (page - 1) * limit;
    const data = await this.typeProductModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    return data;
  }

  async createTypeProduct(body: TypeProduct): Promise<TypeProduct> {
    const bodyTypeProduct: TypeProduct = {
      key: body?.key || 'no-key',
      name: body?.name || [],
      icon: body?.icon || '',
    };
    const dataNew = await this.typeProductModel.create(bodyTypeProduct);
    console.log({ dataNew });

    return dataNew;
  }
}
