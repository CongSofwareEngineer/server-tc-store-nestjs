import { Body, Inject, Injectable, Param, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './schemas/bill.schema';
import { Model, PipelineStage, Types } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { ProductService } from '../production/product.service';
import { DB_COLLECTION, KEY_OPTION_FILTER_DB } from 'src/common/mongoDB';
import { CartService } from '../cartUser/cart.service';
import { FILTER_BILL } from 'src/common/app';
import { decryptData } from 'src/utils/crypto';
import { getQueryDB } from 'src/utils/function';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');
@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private readonly billModel: Model<Bill>,
    @Inject(ProductService) private readonly productService: ProductService,
    @Inject(CartService) private readonly cartService: CartService,
  ) {}

  async create(@Body() bodyEncode): Promise<any> {
    try {
      const body = decryptData(bodyEncode.data);
      if (!body) {
        return null;
      }

      const listIdCart: string[] = [];
      const listBillDetail = body.listBill.map((e) => {
        listIdCart.push(e.idCart);
        const itemTemp: any = {
          _id: new Types.ObjectId(e._id),
          amount: Number(e.amount),
          keyName: e.keyName,
        };
        if (e.moreConfig) {
          itemTemp.moreConfig = e.moreConfig;
        }
        return itemTemp;
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
        totalBill: Number(body.totalBill),
      };

      const lsitUpdateProductFuc = body.listNewSoldProduct.map((e: any) => {
        return this.productService.updateProduct(e.idProduct, { sold: e.sold });
      });
      await Promise.all([
        this.cartService.deleteManyProduct(listIdCart),
        lsitUpdateProductFuc,
      ]);

      return FunService.create(this.billModel, bodyTemp);
    } catch (error) {
      return null;
    }
  }

  async updateBill(@Body() bodyEncode, @Param() param): Promise<Bill> {
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    return FunService.updateData(this.billModel, param.id, body);
  }

  async getAllBill(@Query() query): Promise<Bill[]> {
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
    const queryBase = getQueryDB(query, KEY_OPTION_FILTER_DB.Bill);

    pipeline.push(queryBase);

    const data = await FunService.getDataByAggregate(
      this.billModel,
      query,
      pipeline,
    );
    return data;
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
    const queryBase = getQueryDB(query, KEY_OPTION_FILTER_DB.Bill);
    pipeline.push(queryBase);

    const data = await FunService.getDataByAggregate(
      this.billModel,
      query,
      pipeline,
    );

    return data;
  }
}
