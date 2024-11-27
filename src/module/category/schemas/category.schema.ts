import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SubCategories } from 'src/module/sub-categories/schemas/subCategories.schema';

@Schema({ versionKey: false })
export class Category extends SubCategories {
  @Prop()
  subCategories?: string[];
}
export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
