import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false })
export class Comment {
  _id?: Types.ObjectId;

  @Prop()
  date?: string;

  @Prop()
  des?: string;

  @Prop()
  title?: string;

  @Prop()
  idUser?: string;

  @Prop({ type: Array<{ [key: string]: any }> })
  lisReplay?: [
    {
      idUser?: string;
      des?: string;
      date?: string;
    },
  ];

  @Prop()
  like?: number;
}

export type CommentDocument = HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret.__v;
    return ret;
  },
});
