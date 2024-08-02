import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false })
export class ContactMe {
  _id?: Types.ObjectId;

  @Prop()
  nameUser?: string;

  @Prop()
  emailUser?: string;

  @Prop()
  des?: string;

  @Prop({ type: Object })
  more?: { [key: string]: any };
}
export type ContactMeDocument = HydratedDocument<ContactMe>;
export const ContactMeSchema = SchemaFactory.createForClass(ContactMe);
