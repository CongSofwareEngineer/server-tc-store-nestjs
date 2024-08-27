import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false })
export class ContactMe {
  _id?: Types.ObjectId;

  @ApiProperty({
    type: String,
  })
  @Prop()
  nameUser?: string;

  @ApiProperty({
    type: String,
  })
  @Prop()
  emailUser?: string;

  @ApiProperty({
    type: String,
  })
  @Prop()
  des?: string;

  @ApiProperty({
    type: String,
  })
  @Prop({ type: Object })
  more?: { [key: string]: any };
}
export type ContactMeDocument = HydratedDocument<ContactMe>;
export const ContactMeSchema = SchemaFactory.createForClass(ContactMe);
