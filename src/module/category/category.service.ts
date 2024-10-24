import { Injectable, Param, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { FunService } from 'src/utils/funcService';
import { convertBoolean } from 'src/utils/function';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getAllType(@Query() query): Promise<Category[]> {
    const options: any = {};
    if (query?.isShow) {
      options.isShow = convertBoolean(query?.isShow);
    }

    return FunService.getFullDataByOption(this.categoryModel, options);
  }

  async getTypeByLimit(@Query() query): Promise<Category[]> {
    return FunService.getDataByOptions(this.categoryModel, query, [
      {
        $match: { isShow: true },
      },
    ]);
  }

  async deleteCategory(@Param() param): Promise<Category | null> {
    return FunService.deleteDataByID(this.categoryModel, param.id);
  }

  async createCategory(body: Category): Promise<Category> {
    const bodyCategory: Category = {
      keyName: body?.keyName || 'no-key',
      lang: body?.lang || {},
      icon: body?.icon || '',
      isShow: !!body?.isShow,
    };

    return FunService.create(this.categoryModel, bodyCategory);
  }

  async updateCategory(id: string, body: Category): Promise<Category> {
    const bodyCategory: Category = {
      keyName: body?.keyName || 'no-key',
      lang: body?.lang || {},
      icon: body?.icon || '',
      isShow: !!body?.isShow,
    };

    return FunService.updateData(this.categoryModel, id, bodyCategory);
  }
}
