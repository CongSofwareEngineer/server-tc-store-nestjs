import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false })
export class SubCategories {
  _id?: Types.ObjectId;

  @Prop()
  icon?: string;

  @Prop({ type: Object })
  lang?: { [key: string]: string };

  @Prop()
  keyName?: string;

  @Prop()
  isShow?: boolean;
}
export type SubCategoriesDocument = HydratedDocument<SubCategories>;
export const SubCategoriesSchema = SchemaFactory.createForClass(SubCategories);
