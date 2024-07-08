import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class User {
  _id?: Types.ObjectId;

  @Prop()
  sex?: boolean;

  @Prop()
  name: string;

  @Prop()
  avatar?: string | null;

  @Prop()
  pass?: string;

  @Prop()
  sdt?: string;

  @Prop()
  date?: number;

  @Prop()
  isAdmin?: boolean;

  @Prop()
  addressShipper?: string[];

  @Prop()
  exp?: number;

  @Prop()
  address?: string;

  @Prop()
  auth?: string;

  @Prop()
  tokenRefresh?: string;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
