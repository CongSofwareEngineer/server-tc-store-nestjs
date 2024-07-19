import { Body, Inject, Injectable, Param, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartUser } from './schemas/cart.schema';
import { Model, PipelineStage, Types } from 'mongoose';
import { DBCollection } from 'src/common/mongoDB';
import { FunService } from 'src/utils/funcService';
import { ProductService } from '../production/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartUser.name) private cartModel: Model<CartUser>,
    @Inject(ProductService) private productService: ProductService,
  ) {}

  async getAllCart(@Query() query) {
    return FunService.getDataByLimit(this.cartModel, query, { date: -1 });
  }

  async getLengthCartByIdUser(@Param() param) {
    const data = await FunService.getFullDataByOption(this.cartModel, {
      idUser: param.idUser.toString(),
    });
    return { lengthCart: data?.length || 0 };
  }

  async getCartByIdUserIdPro(@Param() param) {
    return FunService.getDataByOptions(
      this.cartModel,
      {},
      {
        idUser: param.idUser,
        idProduct: new Types.ObjectId(param.idProduct),
      },
    );
  }

  async getCartByIdUser(idUser: string, @Query() query) {
    try {
      const arrFilter: PipelineStage[] = [
        {
          $match: { idUser: idUser.toString() },
        },
        {
          $unwind: '$idProduct',
        },
        {
          $lookup: {
            from: DBCollection.Production,
            localField: 'idProduct',
            foreignField: '_id',
            as: 'more_data',
            pipeline: [
              {
                $project: CartUser.pipelineMoreDataGetCart(),
              },
            ],
          },
        },
        {
          $unwind: '$more_data',
        },
        {
          $sort: { date: -1 },
        },
      ];
      const data = await FunService.getDataByAggregate(
        this.cartModel,
        query,
        arrFilter,
      );
      return data;
    } catch (error) {
      return null;
    }
  }

  async create(body: CartUser): Promise<CartUser> {
    const bodyTemp: CartUser = {
      moreConfig: body?.moreConfig || {},
      date: new Date().getTime().toFixed(),
      idUser: body?.idUser,
      amount: Number(body?.amount),
      idProduct: new Types.ObjectId(body.idProduct),
    };

    return FunService.create(this.cartModel, bodyTemp);
  }

  async deleteCart(id: string): Promise<CartUser | null> {
    return FunService.deleteDataByID(this.cartModel, new Types.ObjectId(id));
  }

  async updateCart(id: string, @Body() body): Promise<CartUser | null> {
    return FunService.updateData(this.cartModel, id, body);
  }
}
