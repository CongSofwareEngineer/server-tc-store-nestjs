import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { DB_COLLECTION } from 'src/common/mongoDB';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: DB_COLLECTION.User },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
