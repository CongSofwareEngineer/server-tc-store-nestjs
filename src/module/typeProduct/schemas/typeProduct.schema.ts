import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class TypeProduct {
  @Prop()
  icon?: string;

  @Prop()
  name?: { lan: string; name: string }[] | [];

  @Prop()
  key?: string;
}
export type TypeProductDocument = HydratedDocument<TypeProduct>;
export const TypeProductSchema = SchemaFactory.createForClass(TypeProduct);
