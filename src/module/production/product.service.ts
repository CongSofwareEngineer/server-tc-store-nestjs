import { Body, Inject, Injectable, Param, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { MATH_DB, PATH_IMG } from 'src/common/mongoDB';
import { getIdObject, isObject, lowercase } from 'src/utils/function';
import { MATH_SORT } from 'src/common/app';
import { CloudinaryService } from 'src/services/cloudinary';
import { decryptData } from 'src/utils/crypto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @Inject(CategoryService) private readonly categoryService: CategoryService,
  ) {}

  async deleteImgProduct(listIdProduct: string[]): Promise<void> {
    const filter = {
      _id: { [MATH_DB.$in]: listIdProduct },
    };
    const listProduct = await FunService.getFullDataByOption(
      this.productModel,
      filter,
    );
    const listId = listProduct
      .filter((e) => {
        if (e.imageMain) {
          return true;
        }
        return false;
      })
      .map((e) => e.imageMain);
    const arr = listId.map((id) => CloudinaryService.deleteImg(id));
    await Promise.all(arr);
  }

  async create(@Body() bodyEncode): Promise<Product> {
    try {
      const body = decryptData(bodyEncode.data);
      if (!body) {
        return null;
      }

      const listImgMoreFun: any[] = body.imageMore.map((e) => {
        return CloudinaryService.uploadImg(e, PATH_IMG.Products);
      });

      const listUrlImgMore = await Promise.all(listImgMoreFun);

      const urlImgMain: any = await CloudinaryService.uploadImg(
        body.imageMain,
        PATH_IMG.Products,
      );

      const listPublicIdImgMore = listUrlImgMore.map((e: any) => {
        return e?.public_id || e;
      });
      const dataNew: Product = {
        ...body,
        imageMain: urlImgMain.public_id,
        imageMore: listPublicIdImgMore,
      };

      return FunService.create(this.productModel, dataNew);
    } catch (error) {
      return null;
    }
  }

  async deleteProductByID(@Param() param): Promise<Product | null> {
    this.deleteImgProduct([param.id]);
    return FunService.deleteDataByID(this.productModel, getIdObject(param.id));
  }

  async deleteManyProduct(listId: string[]): Promise<Product | null> {
    const filter = {
      id: { [MATH_DB.$in]: listId },
    };
    this.deleteImgProduct(listId);
    return FunService.deleteManyData(this.productModel, filter);
  }

  async updateProduct(id: string, @Body() bodyEncode): Promise<Product | null> {
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    const dataBody = { ...body };
    if (body?.imageMore) {
      const listImgMoreFun: any[] = body.imageMore.map((e) => {
        if (isObject(e)) {
          return CloudinaryService.uploadImg(e, PATH_IMG.Products);
        }
        return e;
      });
      const listImg = await Promise.all(listImgMoreFun);
      const listImgValid = listImg.map((e) => {
        if (isObject(e)) {
          return e.public_id;
        }
        return e;
      });
      dataBody.imageMore = listImgValid;
    }

    if (body?.imageMain) {
      if (isObject(body?.imageMain)) {
        const dataImgMain = await CloudinaryService.uploadImg(
          body.imageMain,
          PATH_IMG.Products,
        );
        dataBody.imageMain = dataImgMain.public_id;
      }
    }

    return FunService.updateData(this.productModel, id, dataBody);
  }

  async getProductByID(id: string): Promise<Product | null> {
    return FunService.findDataByID(this.productModel, id);
  }

  async getProductByKeyName(keyName: string): Promise<Product | null> {
    return FunService.getOneData(this.productModel, { keyName });
  }

  async getAllProduct(@Query() query): Promise<Product[]> {
    let matchQuery: Record<string, any> = {};
    let listType: string[];
    if (query.category && lowercase(query.category) !== 'all') {
      listType = query.category.split(',');
      listType = listType.map((e) => lowercase(e));
      matchQuery.category = { [MATH_DB.$in]: listType };
    }

    if (query.name) {
      matchQuery.name = { [MATH_DB.$regex]: new RegExp(query.name, 'i') };
    }

    const dataFilter = await FunService.getSortDataByAggregate(
      this.productModel,
      query,
      [
        {
          $match: matchQuery,
        },
        {
          $project: {
            cost: 0,
          },
        },
      ],
      {
        price: query.sort ? (query.sort === MATH_SORT.asc ? 1 : -1) : 1,
      },
    );

    return dataFilter;
  }

  async getListProductAdmin(@Query() query): Promise<Product[]> {
    let matchQuery: Record<string, any> = {};
    let listType: string[];
    if (query.category && lowercase(query.category) !== 'all') {
      listType = query.category.split(',');
      listType = listType.map((e) => lowercase(e));
      matchQuery.category = { [MATH_DB.$in]: listType };
    }

    if (query.keyName) {
      matchQuery.keyName = query.keyName;
    }

    const dataFilter = await FunService.getSortDataByAggregate(
      this.productModel,
      query,
      [
        {
          $match: matchQuery,
        },
      ],
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
