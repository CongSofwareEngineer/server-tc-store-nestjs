import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
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
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
