import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class CartUser {
  _id?: Types.ObjectId;

  @Prop()
  amount?: number;

  @Prop()
  date?: string;

  @Prop()
  idProduct?: string;

  @Prop()
  idUser?: string;

  @Prop()
  imageMain?: string;

  @Prop()
  keyNameProduct?: string;

  @Prop()
  exp?: number;

  @Prop({ type: Object })
  moreConfig?: { [key: string]: any };

  @Prop()
  name?: string;

  @Prop()
  price?: number;

  @Prop()
  sold?: number;

  @Prop()
  totalAmount?: number;

  @Prop()
  weight?: string;

  @Prop()
  typeProduct?: string;

  static pipelineMoreDataGetCart() {
    const bodyMoreDataRes = {
      _id: 0,
      amount: 1,
      disCount: 1,
      imageMore: 1,
      imageMain: 1,
      name: 1,
      keyName: 1,
      linkShoppe: 1,
      linkFacebook: 1,
      numberChildren: 1,
      price: 1,
      sold: 1,
      typeProduct: 1,
      weight: 1,
      // __v: 0,
    };
    return bodyMoreDataRes;
  }
}
export type CartUserDocument = HydratedDocument<CartUser>;
export const CartUserSchema = SchemaFactory.createForClass(CartUser);
