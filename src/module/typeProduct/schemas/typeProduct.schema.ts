import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class TypeProduct {
  _id?: Types.ObjectId;

  @Prop()
  icon?: string;

  @Prop()
  name?: { lan: string; name: string }[] | [];

  @Prop()
  key?: string;
}
export type TypeProductDocument = HydratedDocument<TypeProduct>;
export const TypeProductSchema = SchemaFactory.createForClass(TypeProduct);
