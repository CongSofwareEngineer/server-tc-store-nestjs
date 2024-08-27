import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({
    type: String,
  })
  @Prop()
  sdt?: string;

  @ApiProperty({
    type: String,
  })
  @Prop()
  date?: string;

  @ApiProperty({
    type: Boolean,
  })
  @Prop()
  isAdmin?: boolean;

  @ApiProperty({
    type: Array<String>,
  })
  @Prop()
  addressShipper?: string[];

  @ApiProperty({
    type: Number,
  })
  @Prop()
  exp?: number;

  @ApiProperty({
    type: String,
  })
  @Prop()
  address?: string;

  @ApiProperty({
    type: String,
  })
  @Prop()
  auth?: string;

  @ApiProperty({
    type: String,
  })
  @Prop()
  authRefresh?: string;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
