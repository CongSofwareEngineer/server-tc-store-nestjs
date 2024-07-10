import { Injectable, Param, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { FunService } from 'src/utils/funcService';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getAllType(): Promise<Category[]> {
    return this.categoryModel.find(null, { _id: 0 }).exec();
  }

  async getTypeByLimit(@Query() query): Promise<Category[]> {
    return FunService.getDataByLimit(this.categoryModel, query);
  }

  async deleteCategory(@Param() param): Promise<Category | null> {
    return FunService.deleteDataByID(this.categoryModel, param.id);
  }

  async createCategory(body: Category): Promise<Category> {
    const bodyCategory: Category = {
      keyName: body?.keyName || 'no-key',
      lang: body?.lang || {},
      icon: body?.icon || '',
    };

    return FunService.create(this.categoryModel, bodyCategory);
  }
}
