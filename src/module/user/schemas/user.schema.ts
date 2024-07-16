import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
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

  // @IsPhoneNumber(null, { message: 'Number phone not support  ' })
  @Prop()
  sdt?: string;

  @Prop()
  date?: string;

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
  authRefresh?: string;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
