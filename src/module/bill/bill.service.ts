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
import { getDateToQuery, getIdObject, getQueryDB } from 'src/utils/function';
import { UserService } from '../user/user.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private readonly billModel: Model<Bill>,
    @Inject(ProductService) private readonly productService: ProductService,
    @Inject(CartService) private readonly cartService: CartService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  getBaseQueryBill() {
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
    return pipeline;
  }

  async create(@Body() bodyEncode): Promise<Bill> {
    try {
      const body = decryptData(bodyEncode.data);
      if (!body) {
        return null;
      }

      const listIdCart: string[] = [];
      const listFunc: any[] = [];

      const listBillDetail = body.listBill.map((e) => {
        listIdCart.push(e.idCart);
        const itemTemp: any = {
          _id: getIdObject(e._id),
          amount: Number(e.amount),
          keyName: e.keyName,
        };
        if (e.configBill) {
          itemTemp.configBill = e.configBill;
        }
        return itemTemp;
      });

      const bodyTemp: Bill = {
        date: new Date().getTime().toFixed(),
        addressShip: body.addressShip,
        discount: body.discount || 0,
        note: body.note,
        abort: false,
        listBill: listBillDetail,
        sdt: body?.sdt,
        status: FILTER_BILL.Processing,
        totalBill: Number(body.totalBill),
      };
      listFunc.push(this.cartService.deleteManyProduct(listIdCart));

      body.listNewSoldProduct.forEach((e: any) => {
        listFunc.push(this.productService.updateProductFromBill(e));
      });

      await Promise.all([listFunc]);

      return FunService.create(this.billModel, bodyTemp);
    } catch (error) {
      return null;
    }
  }

  async createNoLogin(bodyEncode: string): Promise<Bill> {
    try {
      try {
        const body = decryptData(bodyEncode);
        if (!body) {
          return null;
        }

        const listFunc: any[] = [];

        const listBillDetail = body.listBill.map((e) => {
          const itemTemp: any = {
            _id: getIdObject(e._id),
            amount: Number(e.amount),
            keyName: e.keyName,
          };
          if (e.configBill) {
            itemTemp.configBill = e.configBill;
          }
          return itemTemp;
        });

        const bodyTemp: Bill = {
          date: new Date().getTime().toFixed(),
          addressShip: body.addressShip,
          discount: body.discount || 0,
          note: body.note,
          abort: false,
          listBill: listBillDetail,
          sdt: body?.sdt,
          status: FILTER_BILL.Processing,
          totalBill: Number(body.totalBill),
        };

        body.listNewSoldProduct.forEach((e: any) => {
          listFunc.push(this.productService.updateProductFromBill(e));
        });

        await Promise.all([listFunc]);

        return FunService.create(this.billModel, bodyTemp);
      } catch (error) {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async updateBill(@Body() bodyEncode, @Param() param): Promise<Bill> {
    const body = decryptData(bodyEncode.data);
    const listFuc: Promise<any>[] = [];

    if (!body || !FILTER_BILL[body?.status]) {
      return null;
    }

    listFuc.push(
      FunService.updateData(this.billModel, param.id, {
        status: body.status,
      }),
    );

    if (body.idUser && body.status === FILTER_BILL.DeliverySuccess) {
      const user = await this.userService.getUserByID(body.idUser);
      if (user?.exp) {
        const dataUpdate = {
          exp: user.exp + body.expUser,
        };

        listFuc.push(this.userService.updateUserFormServer(body.idUser, dataUpdate));
      }
    }

    const [dataBill] = await Promise.all(listFuc);

    return dataBill;
  }

  async getAllBill(@Query() query): Promise<Bill[]> {
    const pipeline = this.getBaseQueryBill();
    const queryMore: PipelineStage = {
      $match: {},
    };
    if (query?.status) {
      queryMore.$match[`status`] = query.status;
    }
    if (query?.date) {
      queryMore.$match[`date`] = getDateToQuery(query?.date);
    }
    pipeline.push(queryMore);
    const data = await FunService.getDataByAggregate(this.billModel, query, pipeline);
    return data;
  }

  async getAllBillAdmin(@Query() query): Promise<Bill[]> {
    const pipeline = this.getBaseQueryBill();
    const queryMore = getQueryDB(query, KEY_OPTION_FILTER_DB.Bill);

    pipeline.push(queryMore);

    const data = await FunService.getDataByAggregate(this.billModel, query, pipeline);
    return data;
  }

  async getFullBillAdmin(@Query() query): Promise<Bill[]> {
    const pipeline = this.getBaseQueryBill();
    const queryMore = getQueryDB(query, KEY_OPTION_FILTER_DB.Bill);

    pipeline.push(queryMore);

    const data = await FunService.getFullDataByAggregate(this.billModel, pipeline);
    return data;
  }

  async getBillByID(id: Types.ObjectId): Promise<Bill> {
    return FunService.findDataByID(this.billModel, getIdObject(id?.toString()));
  }

  async deleteBillByID(id: string): Promise<Bill> {
    return FunService.deleteDataByID(this.billModel, getIdObject(id));
  }

  async getBillByIDUser(@Query() query, idUser: Types.ObjectId): Promise<Bill[]> {
    const pipeline = this.getBaseQueryBill();
    const queryBase: PipelineStage = getQueryDB(query, KEY_OPTION_FILTER_DB.Bill);

    queryBase.$match['idUser'] = getIdObject(idUser?.toString());

    pipeline.push(queryBase);

    const data = await FunService.getDataByAggregate(this.billModel, query, pipeline);

    return data;
  }
}
