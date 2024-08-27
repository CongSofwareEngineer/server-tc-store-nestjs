import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { CartUser } from 'src/module/cartUser/schemas/cart.schema';

@Schema({ versionKey: false })
export class Bill {
  _id?: Types.ObjectId;

  @Prop()
  date?: string;

  @ApiProperty({
    type: String,
  })
  @Prop()
  sdt?: string;

  @ApiProperty({
    type: Number,
  })
  @Prop()
  totalBill?: number;

  @ApiProperty({
    type: Number,
  })
  @Prop()
  discount?: number;

  @ApiProperty({
    type: String,
  })
  @Prop()
  idUser?: Types.ObjectId;

  @ApiProperty({
    type: Object,
  })
  @Prop({ type: Object })
  addressShip?: {
    address?: string;
    addressDetail?: string;
  };

  @ApiProperty({
    type: Boolean,
  })
  @Prop()
  abort?: boolean;

  @ApiProperty({
    type: String,
  })
  @Prop()
  status?: string;

  @ApiProperty({
    type: Object,
  })
  @Prop({ type: Object })
  contentBill?: {
    contentBillBanking?: number;
    contentBillMomo?: number;
  };

  @ApiProperty({
    type: String,
  })
  @Prop()
  note?: string;

  @ApiProperty({
    type: Object,
  })
  @Prop({ type: Object })
  listBill?: {
    _id?: Types.ObjectId;
    amount?: number;
    moreConfig?: Record<string, any>;
    keyName?: string;
    idCart?: string;
  }[];

  static pipelineMoreDataGetCart() {
    return CartUser.pipelineMoreDataGetCart();
  }
}

export type BillDocument = HydratedDocument<Bill>;
export const BillSchema = SchemaFactory.createForClass(Bill);
