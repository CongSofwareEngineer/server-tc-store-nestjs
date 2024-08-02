import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false })
export class MyService {
  _id?: Types.ObjectId;

  @Prop()
  icon?: string;

  @Prop()
  title?: string;

  @Prop()
  des?: string;

  @Prop({ type: Object })
  more?: { [key: string]: any };
}
export type MyServiceDocument = HydratedDocument<MyService>;
export const MyServiceSchema = SchemaFactory.createForClass(MyService);
