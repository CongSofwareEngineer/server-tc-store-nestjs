import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false })
export class CartUser {
  _id?: Types.ObjectId;

  @Prop()
  amount?: number;

  @Prop()
  date?: string;

  @Prop()
  idProduct?: Types.ObjectId;

  @Prop()
  idUser?: string;

  @Prop()
  imageMain?: string;

  @Prop()
  keyNameProduct?: string;

  @Prop()
  exp?: number;

  @Prop({ type: Object })
  configBill?: { [key: string]: any };

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
  category?: string;

  static pipelineMoreDataGetCart() {
    const bodyMoreDataRes = {
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
      category: 1,
      weight: 1,
    };
    return bodyMoreDataRes;
  }
}
export type CartUserDocument = HydratedDocument<CartUser>;
export const CartUserSchema = SchemaFactory.createForClass(CartUser);
