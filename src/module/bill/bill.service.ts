import { Inject, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './schemas/bill.schema';
import { Model } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { ProductService } from '../production/product.service';
import { getPageLimitSkip } from 'src/utils/function';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private readonly billModel: Model<Bill>,
    @Inject(ProductService) private readonly productService: ProductService,
  ) {}

  async create(body: Bill): Promise<Bill> {
    body.date = new Date().getTime().toFixed();
    return FunService.create(this.billModel, body);
  }

  async updateBill(id: string, body: Bill): Promise<Bill> {
    return FunService.updateData(this.billModel, id, body);
  }

  async getBillByID(id: string): Promise<Bill> {
    return FunService.findDataByID(this.billModel, id);
  }

  async deleteBillByID(id: string): Promise<Bill> {
    return FunService.deleteDataByID(this.billModel, id);
  }

  async getBillByIDUser(@Query() query, idUser: string): Promise<Bill[]> {
    // const data=await FunService.getDataByLimit(this.billModel, page, limit);
    const pageLimitSkip = getPageLimitSkip(query);
    const data = await this.billModel
      .find({ isUser: idUser })
      .skip(Number(pageLimitSkip.skip))
      .limit(Number(pageLimitSkip.limit))
      .exec();

    const listIDProduct: string[] = data.flatMap((e) =>
      e.listBill.map((item) => item.id),
    );
    const dataProduct =
      await this.productService.getProductByListID(listIDProduct);
    console.log('====================================');
    console.log({ dataProduct });
    console.log('====================================');

    return data;
  }
}
