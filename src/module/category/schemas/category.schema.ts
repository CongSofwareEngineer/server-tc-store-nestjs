import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false })
export class Category {
  _id?: Types.ObjectId;

  @Prop()
  icon?: string;

  @Prop({ type: Object })
  lang?: { [key: string]: string };

  @Prop()
  keyName?: string;
}
export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
