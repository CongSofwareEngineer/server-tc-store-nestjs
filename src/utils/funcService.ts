import { Query } from '@nestjs/common';
import { Model, PipelineStage, SortValues, Types } from 'mongoose';
import { getPageLimitSkip } from 'src/utils/function';

export class FunService {
  static modelService: any = new FunService();

  static async create(model: Model<any>, data: any): Promise<any> {
    try {
      const dataNew = await model.create(data);
      return dataNew;
    } catch (error) {
      return null;
    }
  }

  static async deleteDataByID(
    model: Model<any>,
    id: Types.ObjectId,
  ): Promise<any> {
    try {
      return model.findByIdAndDelete(id).exec();
    } catch (error) {
      return null;
    }
  }

  static async deleteManyData(
    model: Model<any>,
    filter: { [key: string]: any } = {},
    options: { [key: string]: any } = {},
  ): Promise<any> {
    try {
      return model.deleteMany(filter, options).exec();
    } catch (error) {
      return null;
    }
  }

  static async findDataByID(
    model: Model<any>,
    id: string | Types.ObjectId,
  ): Promise<any> {
    try {
      return model.findById(id).exec();
    } catch (error) {
      return null;
    }
  }

  static async getFullDataByOption(
    model: Model<any>,
    queryOption: { [key: string]: any } = {},
    options: { [key: string]: any } = {},
  ): Promise<any> {
    try {
      const data = await model.find(queryOption, options).exec();

      return data;
    } catch (error) {
      return null;
    }
  }

  static async getOneData(model: Model<any>, param: { [key: string]: any }) {
    try {
      return model.findOne(param).exec();
    } catch (error) {
      return null;
    }
  }

  static async getDataByID(
    model: Model<any>,
    id: Types.ObjectId,
    @Query() query,
  ): Promise<any[]> {
    try {
      const pageLimitSkip = getPageLimitSkip(query);

      const data = await model
        .findById(id)
        .skip(Number(pageLimitSkip.skip))
        .limit(Number(pageLimitSkip.limit))
        .exec();
      return data;
    } catch (error) {
      return [];
    }
  }

  static async getDataByListID(
    model: Model<any>,
    listId: string[],
    @Query() query,
  ): Promise<any[]> {
    try {
      const pageLimitSkip = getPageLimitSkip(query);

      const data = await model
        .find({
          _id: { $in: listId },
        })
        .skip(Number(pageLimitSkip.skip))
        .limit(Number(pageLimitSkip.limit))
        .exec();
      return data;
    } catch (error) {
      return [];
    }
  }

  static async getDataByOptions(
    model: Model<any>,
    @Query() query,
    queryOption: { [key: string]: any } = {},
    options: { [key: string]: any } = {},
    optionsSort: { [key: string]: any } = {},
  ): Promise<any[]> {
    try {
      const pageLimitSkip = getPageLimitSkip(query);

      const data = await model
        .find(queryOption, options)
        .skip(Number(pageLimitSkip.skip))
        .limit(Number(pageLimitSkip.limit))
        .sort(optionsSort)
        .exec();

      return data;
    } catch (error) {
      return null;
    }
  }

  static async getDataByAggregate(
    model: Model<any>,
    @Query() query,
    pipelineStage?: PipelineStage[],
  ): Promise<any[]> {
    try {
      const pageLimitSkip = getPageLimitSkip(query);
      const data = await model
        .aggregate(pipelineStage)
        .skip(Number(pageLimitSkip.skip))
        .limit(Number(pageLimitSkip.limit))
        .exec();

      return data;
    } catch (error) {
      return [];
    }
  }

  static async getSortDataByAggregate(
    model: Model<any>,
    @Query() query,
    pipelineStage?: PipelineStage[],
    optionSort?: Record<string, SortValues>,
  ): Promise<any[]> {
    try {
      const pageLimitSkip = getPageLimitSkip(query);
      const data = await model
        .aggregate(pipelineStage)
        .skip(Number(pageLimitSkip.skip))
        .limit(Number(pageLimitSkip.limit))
        .sort(optionSort)
        .exec();

      return data;
    } catch (error) {
      return [];
    }
  }

  static async getFullDataByAggregate(
    model: Model<any>,
    pipelineStage?: PipelineStage[],
  ): Promise<any[]> {
    try {
      const data = await model.aggregate(pipelineStage).exec();
      return data;
    } catch (error) {
      return [];
    }
  }

  static async getAndSortDataByOptions(
    model: Model<any>,
    @Query() query,
    queryOption: { [key: string]: any } = {},
    options: { [key: string]: any } = {},
    optionsSort: { [key: string]: any } = {},
  ): Promise<any[]> {
    try {
      const pageLimitSkip = getPageLimitSkip(query);

      const data = await model
        .find(queryOption, options)
        .sort(optionsSort)
        .skip(Number(pageLimitSkip.skip))
        .limit(Number(pageLimitSkip.limit))
        .exec();

      return data;
    } catch (error) {
      return [];
    }
  }

  static async getFullDataByID(
    model: Model<any>,
    id: string | Types.ObjectId,
  ): Promise<any[]> {
    try {
      return model.findById(id).exec();
    } catch (error) {
      return null;
    }
  }

  static async getDataByLimit(
    model: Model<any>,
    @Query() query,
    querySort?: any,
  ): Promise<any[]> {
    try {
      const pageLimitSkip = getPageLimitSkip(query);
      const data = await model
        .find()
        .skip(Number(pageLimitSkip.skip))
        .limit(Number(pageLimitSkip.limit))
        .sort(querySort)
        .exec();
      return data;
    } catch (error) {
      return [];
    }
  }

  static async updateData(
    model: Model<any>,
    id: string,
    body: any,
  ): Promise<any> {
    try {
      const data = await model.findByIdAndUpdate(id, body).exec();
      return data;
    } catch (error) {
      return null;
    }
  }
}
