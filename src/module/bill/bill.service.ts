import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './schemas/bill.schema';
import { Model } from 'mongoose';
import { FunService } from 'src/common/funcService';
import { ProductService } from '../production/product.service';
import { Product } from '../production/schemas/product.schema';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private readonly billModel: Model<Bill>,
  ) {}

  async create(body: Bill): Promise<Bill> {
    return FunService.create(this.billModel, body);
  }

  async getBillByLimit(page: number, limit: number): Promise<Bill[]> {
    // const data=await FunService.getDataByLimit(this.billModel, page, limit);
    const skip = (page - 1) * limit;
    const data = await this.billModel
      .find()
      .skip(Number(skip))
      .limit(Number(limit))
      .exec();
    const listIDProduct = data.flatMap((e) =>
      e.listBill.map((item) => item._id),
    );

    return listIDProduct;
  }

  async getBillByID(id: string): Promise<Bill> {
    return FunService.findDataByID(this.billModel, id);
  }

  async deleteBillByID(id: string): Promise<Bill> {
    return FunService.deleteDataByID(this.billModel, id);
  }

  async updateBill(id: string, body: Bill): Promise<Bill> {
    return FunService.updateData(this.billModel, id, body);
  }
}
