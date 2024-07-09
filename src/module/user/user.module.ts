import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { DBCollection } from 'src/common/mongoDB';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: DBCollection.User },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
