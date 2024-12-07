import { Query } from '@nestjs/common';
import { QueryOptions } from 'mongoose';
import { FilterQuery, Model, PipelineStage, SortValues, Types } from 'mongoose';
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

  static async deleteDataByID<T>(model: Model<T>, id: Types.ObjectId): Promise<T | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        null;
      }

      return model.findByIdAndDelete(id).exec();
    } catch (error) {
      return null;
    }
  }

  static async deleteManyData<T>(
    model: Model<T>,
    filter: FilterQuery<T> = {},
    options: FilterQuery<T> = {},
  ): Promise<boolean> {
    try {
      await model.deleteMany(filter, options).exec();
      return true;
    } catch (error) {
      return false;
    }
  }

  static async findDataByID<T>(model: Model<T>, id: string | Types.ObjectId): Promise<T | null> {
    try {
      const data = await model.findById(id).exec();
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getFullDataByOption<T>(
    model: Model<T>,
    queryOption: FilterQuery<T> = {},
    options: FilterQuery<T> = {},
  ): Promise<T[]> {
    try {
      const data = await model.find(queryOption, options).exec();

      return data;
    } catch (error) {
      return [];
    }
  }

  static async getOneData<T>(model: Model<T>, param: QueryOptions): Promise<T | null> {
    try {
      return model.findOne(param).exec();
    } catch (error) {
      return null;
    }
  }

  static async getDataByID<T>(model: Model<T>, id: Types.ObjectId, @Query() query): Promise<T> {
    try {
      const pageLimitSkip = getPageLimitSkip(query);

      const data = await model.findById(id).skip(Number(pageLimitSkip.skip)).limit(Number(pageLimitSkip.limit)).exec();
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getDataByListID<T>(model: Model<T>, listId: string[], @Query() query): Promise<T[]> {
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

  static async getDataByOptions<T>(
    model: Model<T>,
    @Query() query,
    queryOption: FilterQuery<T> = {},
    options: FilterQuery<T> = {},
    optionsSort: FilterQuery<T> = {},
  ): Promise<T[]> {
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

  static async getDataByAggregate<T>(model: Model<T>, @Query() query, pipelineStage?: PipelineStage[]): Promise<T[]> {
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

  static async getSortDataByAggregate<T>(
    model: Model<T>,
    @Query() query,
    pipelineStage?: PipelineStage[],
    optionSort?: Record<string, SortValues>,
  ): Promise<T[]> {
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

  static async getFullDataByAggregate<T>(model: Model<T>, pipelineStage?: PipelineStage[]): Promise<T[]> {
    try {
      const data = await model.aggregate(pipelineStage).exec();
      return data;
    } catch (error) {
      return [];
    }
  }

  static async getAndSortDataByOptions<T>(
    model: Model<any>,
    @Query() query,
    queryOption: FilterQuery<T> = {},
    options: FilterQuery<T> = {},
    optionsSort: FilterQuery<T> = {},
  ): Promise<T[]> {
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

  static async getFullDataByID<T>(model: Model<T>, id: string | Types.ObjectId): Promise<T> {
    try {
      return model.findById(id).exec();
    } catch (error) {
      return null;
    }
  }

  static async getDataByLimit<T>(model: Model<T>, @Query() query, querySort?: FilterQuery<T>): Promise<T[]> {
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

  static async updateData<T>(model: Model<T>, id: string, body: any): Promise<T> {
    try {
      const data = await model.findByIdAndUpdate(id, body).exec();
      return data;
    } catch (error) {
      return null;
    }
  }
}
