import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Bill {
  _id?: Types.ObjectId;

  date?: string;

  totalBill?: number;

  discount?: number;

  idUser?: string;

  addressShip?: string;

  abort?: boolean;

  contentBill?: {
    contentBillBanking?: number;
    contentBillMomo?: number;
  };

  note?: string;

  listBill?: [
    {
      _id?: Types.ObjectId;
      amount?: number;
      moreConfig: Record<string, any>;
      keyNameProduct?: string;
    },
  ];
}

export type BillDocument = HydratedDocument<Bill>;
export const BillSchema = SchemaFactory.createForClass(Bill);
