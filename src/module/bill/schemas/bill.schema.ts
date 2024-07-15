import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false })
export class Bill {
  _id?: Types.ObjectId;

  @Prop()
  date?: string;

  @Prop()
  totalBill?: number;

  @Prop()
  discount?: number;

  @Prop()
  idUser?: Types.ObjectId;

  @Prop()
  addressShip?: string;

  @Prop()
  abort?: boolean;

  @Prop({ type: Object })
  contentBill?: {
    contentBillBanking?: number;
    contentBillMomo?: number;
  };

  @Prop()
  note?: string;

  @Prop({ type: Object })
  listBill?: {
    _id?: Types.ObjectId;
    amount?: number;
    moreConfig?: Record<string, any>;
    keyNameProduct?: string;
  }[];
}

export type BillDocument = HydratedDocument<Bill>;
export const BillSchema = SchemaFactory.createForClass(Bill);
BillSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret.__v;
    return ret;
  },
});
