import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Bill {
  _id?: Types.ObjectId;

  @Prop()
  date?: string;

  @Prop()
  totalBill?: number;

  @Prop()
  discount?: number;

  @Prop()
  idUser?: string;

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
  listBill?: [
    {
      id?: string;
      amount?: number;
      moreConfig?: Record<string, any>;
      keyNameProduct?: string;
    },
  ];
}

export type BillDocument = HydratedDocument<Bill>;
export const BillSchema = SchemaFactory.createForClass(Bill);
