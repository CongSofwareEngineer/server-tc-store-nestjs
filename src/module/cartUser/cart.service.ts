import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartUser } from './schemas/cart.schema';
import { Model, Types } from 'mongoose';
import { DBCollection, MathDB } from 'src/common/mongoDB';
import { FunService } from 'src/utils/funcService';
import { ProductService } from '../production/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartUser.name) private cartModel: Model<CartUser>,
    @Inject(ProductService) private productService: ProductService,
  ) {}

  async getLengthCartByIdUser(@Param() param) {
    return FunService.getFullDataByID(this.cartModel, param.idUser);
  }

  async getCartByIdUser(idUser: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const data = await this.cartModel
      .aggregate([
        {
          $match: { idUser: idUser },
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
      ])
      .skip(skip)
      .limit(limit);

    return data;
  }

  async create(body: CartUser): Promise<CartUser> {
    const bodyTemp: CartUser = {
      moreConfig: body?.moreConfig || {},
      date: body?.date || Date.now().toFixed(),
      idUser: body?.idUser,
      amount: body?.amount,
      idProduct: body.idProduct,
    };
    return FunService.create(this.cartModel, bodyTemp);
  }

  async deleteCart(id: string): Promise<CartUser | null> {
    return FunService.deleteDataByID(this.cartModel, id);
  }

  async updateCart(id: string, @Body() body): Promise<CartUser | null> {
    return FunService.updateData(this.cartModel, id, body);
  }
}
