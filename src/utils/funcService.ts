import { Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { getPageLimitSkip } from 'src/utils/function';

export class FunService {
  static modelService: any = new FunService();

  static async create(model: Model<any>, data: any): Promise<any> {
    const dataNew = await model.create(data);
    return dataNew;
  }

  static async deleteDataByID(model: Model<any>, id: string): Promise<any> {
    return model.findByIdAndDelete(id);
  }

  static async findDataByID(model: Model<any>, id: string): Promise<any> {
    return model.findById(id).exec();
  }

  static async findOneData(model: Model<any>, param: { [key: string]: any }) {
    return model.findOne(param);
  }

  static async getDataByListID(
    model: Model<any>,
    listId: string[],
    @Query() query,
  ): Promise<any[]> {
    const pageLimitSkip = getPageLimitSkip(query);

    const data = await model
      .find({
        _id: { $in: listId },
      })
      .skip(Number(pageLimitSkip.skip))
      .limit(Number(pageLimitSkip.limit))
      .exec();
    return data;
  }

  static async findDataByOptions(
    model: Model<any>,
    @Query() query,
    queryOption: { [key: string]: any } = {},
    options: { [key: string]: any } = {},
  ): Promise<any[]> {
    const pageLimitSkip = getPageLimitSkip(query);

    const data = await model
      .find(queryOption, options)
      .skip(Number(pageLimitSkip.skip))
      .limit(Number(pageLimitSkip.limit))
      .exec();

    return data;
  }

  static async findAndSortDataByOptions(
    model: Model<any>,
    @Query() query,
    queryOption: { [key: string]: any } = {},
    options: { [key: string]: any } = {},
    optionsSort: { [key: string]: any } = {},
  ): Promise<any[]> {
    const pageLimitSkip = getPageLimitSkip(query);

    const data = await model
      .find(queryOption, options)
      .sort(optionsSort)
      .skip(Number(pageLimitSkip.skip))
      .limit(Number(pageLimitSkip.limit))
      .exec();

    return data;
  }

  static async getFullDataByID(model: Model<any>, id: string): Promise<any[]> {
    return model.findById(id).exec();
  }

  static async getDataByLimit(
    model: Model<any>,
    @Query() query,
  ): Promise<any[]> {
    const pageLimitSkip = getPageLimitSkip(query);
    const data = await model
      .find()
      .skip(Number(pageLimitSkip.skip))
      .limit(Number(pageLimitSkip.limit))
      .exec();
    return data;
  }

  static async updateData(
    model: Model<any>,
    id: string,
    body: any,
  ): Promise<any> {
    const data = await model.findByIdAndUpdate(id, body).exec();
    return data;
  }
}
