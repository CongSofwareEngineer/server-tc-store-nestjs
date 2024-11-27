import { Body, Injectable, Param, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FunService } from 'src/utils/funcService';
import { convertBoolean } from 'src/utils/function';
import { decryptData } from 'src/utils/crypto';
import { CloudinaryService } from 'src/services/cloudinary';
import { PATH_IMG } from 'src/common/mongoDB';
import { SubCategories } from './schemas/subCategories.schema';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel(SubCategories.name)
    private subCategoriesModel: Model<SubCategories>,
  ) {}

  async getAllType(@Query() query): Promise<SubCategories[]> {
    const options: any = {};
    if (query?.isShow) {
      options.isShow = convertBoolean(query?.isShow);
    }

    return FunService.getFullDataByOption(this.subCategoriesModel, options);
  }

  async getTypeByLimit(@Query() query): Promise<SubCategories[]> {
    return FunService.getDataByOptions(this.subCategoriesModel, query, [
      {
        $match: { isShow: true },
      },
    ]);
  }

  async deleteCategory(@Param() param): Promise<SubCategories | null> {
    return FunService.deleteDataByID(this.subCategoriesModel, param.id);
  }

  async createCategory(@Body() bodyEncode): Promise<SubCategories> {
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    const bodyCategory: SubCategories = {
      keyName: body?.keyName || 'no-key',
      lang: body?.lang || {},
      icon: body?.icon || '',
      isShow: !!body?.isShow,
    };

    return FunService.create(this.subCategoriesModel, bodyCategory);
  }

  async updateCategory(id: string, @Body() bodyEncode): Promise<SubCategories> {
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    if (body?.imgOld) {
      CloudinaryService.deleteImgByData(body?.imgOld);
    }
    const urlImg = await CloudinaryService.getUrlByData(
      body?.icon || '',
      PATH_IMG.Category,
    );

    const bodyCategory: SubCategories = {
      keyName: body?.keyName || 'no-key',
      lang: body?.lang || {},
      icon: urlImg,
      isShow: !!body?.isShow,
    };

    return FunService.updateData(this.subCategoriesModel, id, bodyCategory);
    // return bodyCategory;
  }
}
