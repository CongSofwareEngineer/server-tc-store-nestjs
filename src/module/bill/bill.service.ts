import { Inject, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './schemas/bill.schema';
import { Model, PipelineStage, Types } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { ProductService } from '../production/product.service';
import { DB_COLLECTION } from 'src/common/mongoDB';
import { CartService } from '../cartUser/cart.service';
import { FILTER_BILL } from 'src/common/app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');
@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private readonly billModel: Model<Bill>,
    @Inject(ProductService) private readonly productService: ProductService,
    @Inject(CartService) private readonly cartService: CartService,
  ) {}

  async create(body: Bill): Promise<any> {
    const listIdCart: string[] = [];
    const listBillDetail = body.listBill.map((e) => {
      listIdCart.push(e.idCart);
      const itemBase: any = {
        _id: new Types.ObjectId(e._id),
        amount: Number(e.amount),
        keyName: e.keyName,
      };
      if (e.moreConfig) {
        itemBase.moreConfig = e.moreConfig;
      }
      return itemBase;
    });

    const bodyTemp: Bill = {
      date: new Date().getTime().toFixed(),
      addressShip: body.addressShip,
      idUser: new Types.ObjectId(body.idUser),
      discount: body.discount || 0,
      note: body.note,
      abort: false,
      listBill: listBillDetail,
      sdt: body?.sdt,
      status: FILTER_BILL.Processing,
    };

    await this.cartService.deleteManyProduct(listIdCart);
    return FunService.create(this.billModel, bodyTemp);
  }

  async updateBill(id: string, body: Bill): Promise<Bill> {
    return FunService.updateData(this.billModel, id, body);
  }

  async getAllBill(@Query() query): Promise<Bill[]> {
    return FunService.getDataByLimit(this.billModel, query, { date: -1 });
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
    const pipeline: PipelineStage[] = [
      {
        $unwind: '$listBill',
      },
      {
        $lookup: {
          from: DB_COLLECTION.Production,
          localField: 'listBill._id',
          foreignField: '_id',
          as: 'listBill.more_data',
          pipeline: [
            {
              $project: Bill.pipelineMoreDataGetCart(),
            },
          ],
        },
      },
      {
        $unwind: '$listBill.more_data',
      },
      {
        $group: {
          _id: '$_id',
          date: { $first: '$date' },
          totalBill: { $first: '$totalBill' },
          discount: { $first: '$discount' },
          idUser: { $first: '$idUser' },
          addressShip: { $first: '$addressShip' },
          abort: { $first: '$abort' },
          note: { $first: '$note' },
          sdt: { $first: '$sdt' },
          status: { $first: '$status' },
          listBill: {
            $push: '$listBill',
          },
        },
      },
      {
        $sort: { date: -1 },
      },
    ];
    const queryBase: PipelineStage = {
      $match: { idUser: new Types.ObjectId(idUser) },
    };
    if (query?.type && query?.type !== FILTER_BILL.All) {
      queryBase.$match.status = query?.type;
    }
    if (query?.date) {
      const day = new Date(Number(query.date));

      const start = new Date(moment(day).startOf('day').toString()).getTime();
      const end = new Date(moment(day).endOf('day').toString()).getTime();
      console.log({ day });

      queryBase.$match.date = {
        $gte: start.toString(),
        $lt: end.toString(),
      };
    }
    pipeline.push(queryBase);

    const data = await FunService.getDataByAggregate(
      this.billModel,
      query,
      pipeline,
    );

    return data;
  }
}
