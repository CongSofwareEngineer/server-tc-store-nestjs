import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false })
export class Comment {
  _id?: Types.ObjectId;

  @Prop()
  date?: string;

  @Prop()
  sdt?: string;

  @Prop()
  name?: string;

  @Prop()
  note?: string;

  @Prop()
  idProduct?: Types.ObjectId;

  @Prop({ type: Array<{ [key: string]: any }> })
  listReplay?: {
    idUser?: string;
    des?: string;
    date?: string;
  }[];

  @Prop()
  like?: number;

  @Prop()
  rate?: number;

  @Prop()
  listImg?: string[];
}

export type CommentDocument = HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
