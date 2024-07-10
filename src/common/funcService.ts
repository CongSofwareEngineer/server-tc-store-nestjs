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
    return model.findByIdAndDelete(id, { __v: 0 });
  }

  static async findDataByID(model: Model<any>, id: string): Promise<any> {
    return model.findById(id, { __v: 0 }).exec();
  }

  static async findOneData(model: Model<any>, param: { [key: string]: any }) {
    return model.findOne(param, { __v: 0 });
  }

  static async getDataByListID(
    model: Model<any>,
    listId: string[],
    @Query() query,
  ): Promise<any[]> {
    const pageLimitSkip = getPageLimitSkip(query);

    const data = await model
      .find(
        {
          _id: { $in: listId },
        },
        { __v: 0 },
      )
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
      .find(queryOption, { ...options, __v: 0 })
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
      .find(queryOption, { __v: 0, ...options })
      .sort(optionsSort)
      .skip(Number(pageLimitSkip.skip))
      .limit(Number(pageLimitSkip.limit))
      .exec();

    return data;
  }

  static async getDataByLimit(
    model: Model<any>,
    @Query() query,
  ): Promise<any[]> {
    const pageLimitSkip = getPageLimitSkip(query);
    const data = await model
      .find({}, { __v: 0 })
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
    const data = await model.findByIdAndUpdate(id, body, { __v: 0 }).exec();
    return data;
  }
}
