import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Product {
  @Prop()
  cost?: number;

  @Prop()
  amount?: number;

  @Prop()
  disCount?: number;

  @Prop()
  dateEndSale?: string;

  @Prop()
  dateSale?: string;

  @Prop()
  nsx?: string;

  @Prop()
  hsd?: string;

  @Prop()
  imageMore?: string[];

  @Prop()
  imageMain?: string;

  @Prop()
  des?: string;

  @Prop()
  des2?: string;

  @Prop()
  name?: string;

  @Prop()
  keyName?: string;

  @Prop()
  linkShoppe?: string;

  @Prop()
  linkFacebook?: string;

  @Prop()
  name2?: string;

  @Prop()
  numberChildren?: number;

  @Prop()
  numberLike?: number;

  @Prop()
  price?: number;

  @Prop()
  sold?: number;

  @Prop()
  typeProduct?: string;

  @Prop()
  weight?: string;
}
export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
