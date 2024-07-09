import { Model } from 'mongoose';

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

  static async getDataByLimit(
    model: Model<any>,
    page: number,
    limit: number,
  ): Promise<any[]> {
    const skip = (page - 1) * limit;
    const data = await model
      .find()
      .skip(Number(skip))
      .limit(Number(limit))
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
