import { Inject, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './schemas/bill.schema';
import { Model, Types } from 'mongoose';
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
    console.log({ body });
    const bodyTemp: Bill = {
      date: new Date().getTime().toFixed(),
      addressShip: 'Quận 8',
      idUser: new Types.ObjectId(body.idUser),
      discount: body.discount || 0,
      note: 'Đến nhớ gọi',
      abort: false,
      listBill: [
        {
          _id: '668a3ba4587801297308f7a6',
          amount: 1,
          keyNameProduct: '',
        },
      ],
    };
    return body;
    // return FunService.create(this.billModel, body);
  }

  async updateBill(id: string, body: Bill): Promise<Bill> {
    return FunService.updateData(this.billModel, id, body);
  }

  async getAllBill(@Query() query): Promise<Bill[]> {
    return FunService.getDataByLimit(this.billModel, query);
  }

  async getBillByID(id: Types.ObjectId): Promise<Bill> {
    return FunService.findDataByID(this.billModel, new Types.ObjectId(id));
  }

  async deleteBillByID(id: string): Promise<Bill> {
    return FunService.deleteDataByID(this.billModel, new Types.ObjectId(id));
  }

  async getBillByIDUser(
    @Query() query,
    idUser: Types.ObjectId,
  ): Promise<Bill[]> {
    const dataBase = await FunService.findDataByOptions(this.billModel, query, {
      idUser: new Types.ObjectId(idUser),
    });

    const listIDProduct = dataBase.flatMap((e) =>
      e.listBill.map((item) => item._id),
    );

    const dataProduct =
      await this.productService.getProductByListID(listIDProduct);
    console.log('====================================');
    console.log({ dataProduct });
    console.log('====================================');

    return dataBase;
  }
}
