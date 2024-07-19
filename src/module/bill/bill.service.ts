import { Inject, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './schemas/bill.schema';
import { Model, PipelineStage, Types } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { ProductService } from '../production/product.service';
import { DBCollection } from 'src/common/mongoDB';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private readonly billModel: Model<Bill>,
    @Inject(ProductService) private readonly productService: ProductService,
  ) {}

  async create(body: Bill): Promise<Bill> {
    const listBillDetail = body.listBill.map((e) => {
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
    };

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
        $match: { idUser: new Types.ObjectId(idUser) },
      },
      {
        $unwind: '$listBill',
      },
      {
        $lookup: {
          from: DBCollection.Production,
          localField: 'listBill._id',
          foreignField: '_id',
          as: 'more_data',
          pipeline: [
            {
              $project: Bill.pipelineMoreDataGetCart(),
            },
          ],
        },
      },
      {
        $unwind: '$more_data',
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
          listBill: {
            $push: { $mergeObjects: ['$listBill', '$more_data'] },
          },
        },
      },
      {
        $sort: { date: -1 },
      },
    ];
    const data = await FunService.getDataByAggregate(
      this.billModel,
      query,
      pipeline,
    );

    return data;
  }
}
