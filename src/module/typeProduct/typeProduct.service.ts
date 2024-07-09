import { Injectable, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TypeProduct } from './schemas/typeProduct.schema';
import { FunService } from 'src/common/funcService';

@Injectable()
export class TypeProductService {
  constructor(
    @InjectModel(TypeProduct.name) private typeProductModel: Model<TypeProduct>,
  ) {}

  async getAllType(): Promise<TypeProduct[]> {
    return this.typeProductModel.find().exec();
  }

  async getTypeByLimit(@Query() query): Promise<TypeProduct[]> {
    return FunService.getDataByLimit(this.typeProductModel, query);
  }

  async createTypeProduct(body: TypeProduct): Promise<TypeProduct> {
    const bodyTypeProduct: TypeProduct = {
      key: body?.key || 'no-key',
      name: body?.name || [],
      icon: body?.icon || '',
    };

    return FunService.create(this.typeProductModel, bodyTypeProduct);
  }
}
