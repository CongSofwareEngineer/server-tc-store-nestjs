import { Body, Injectable, Param, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { FunService } from 'src/utils/funcService';
import { convertBoolean, isObject } from 'src/utils/function';
import { decryptData } from 'src/utils/crypto';
import { CloudinaryService } from 'src/services/cloudinary';
import { PATH_IMG } from 'src/common/mongoDB';

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

  async createCategory(@Body() bodyEncode): Promise<Category> {
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    const bodyCategory: Category = {
      keyName: body?.keyName || 'no-key',
      lang: body?.lang || {},
      icon: body?.icon || '',
      isShow: !!body?.isShow,
    };
    return FunService.create(this.categoryModel, bodyCategory);
  }

  async updateCategory(id: string, @Body() bodyEncode): Promise<Category> {
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    if (body?.imgOld) {
      CloudinaryService.deleteImg(body?.imgOld);
    }
    const urlImg = await CloudinaryService.getUrlByData(
      body?.icon || '',
      PATH_IMG.Category,
    );

    const bodyCategory: Category = {
      keyName: body?.keyName || 'no-key',
      lang: body?.lang || {},
      icon: urlImg,
      isShow: !!body?.isShow,
    };

    return FunService.updateData(this.categoryModel, id, bodyCategory);
    // return bodyCategory;
  }
}
