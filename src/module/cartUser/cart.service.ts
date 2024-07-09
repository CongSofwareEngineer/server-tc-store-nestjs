import { Body, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartUser } from './schemas/cart.schema';
import { Model, Types } from 'mongoose';
import { DBCollection } from 'src/common/mongoDB';
import { ObjectId } from 'mongodb';
import { FunService } from 'src/common/funcService';
import axios from 'axios';
import { Product } from '../production/schemas/product.schema';
import { ProductService } from '../production/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartUser.name) private cartModel: Model<CartUser>,
    @Inject(ProductService) private productService: ProductService,
  ) {}

  async getCartByIdUser(idUser: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    // const data = await this.cartModel
    //   .aggregate([
    //     {
    //       $match: { idUser: idUser },
    //     },
    //     {
    //       $lookup: {
    //         from: DBCollection.Production,
    //         localField: 'idProduct',
    //         foreignField: '_id',
    //         as: 'more_data',
    //         pipeline: [
    //           {
    //             $project: CartUser.pipelineMoreDataGetCart(),
    //           },
    //         ],
    //       },
    //     },
    //   ])
    //   .skip(skip)
    //   .limit(limit);
    const data = await this.cartModel.find({
      idUser: idUser,
    });
    const listId = data.map((e) => new Types.ObjectId(e.idUser));
    const dataPro = await this.productService.getProductByListID(listId);
    console.log({ dataPro });

    return listId;
  }

  async create(body: CartUser): Promise<CartUser> {
    const bodyTemp: CartUser = {
      moreConfig: body?.moreConfig || {},
      date: body?.date || Date.now().toFixed(),
      idUser: body?.idUser,
      amount: body?.amount,
      idProduct: new ObjectId(body.idProduct),
    };
    return FunService.create(this.cartModel, bodyTemp);
  }

  async deleteCart(id: string): Promise<CartUser> {
    return FunService.deleteDataByID(this.cartModel, id);
  }

  async updateCart(id: string, @Body() body): Promise<CartUser> {
    return FunService.updateData(this.cartModel, id, body);
  }
}
