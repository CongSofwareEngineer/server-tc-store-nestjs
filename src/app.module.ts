import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './module/cartUser/cart.module';

import { MongooseModule } from '@nestjs/mongoose';
import { DataBaseName } from './common/mongoDB';
import { UserModule } from './module/user/user.module';
import { TypeProductModule } from './module/typeProduct/typeProduct.module';
import { ProductModule } from './module/production/product.module';
import { AuthModule } from './module/auth/auth.module';
import { MomoModule } from './module/momo/momo.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerMiddleware } from './logger.middleware';
import { BillModule } from './module/bill/bill.module';
import { CommentModule } from './module/comment/comment.module';

@Module({
  imports: [
    AuthModule,
    MomoModule,
    CarModule,
    ProductModule,
    UserModule,
    TypeProductModule,
    BillModule,
    CommentModule,
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USER_NAME_MONGO}:${process.env.PASSWORD_MONGO}@tc-store-admin.mpkyxqj.mongodb.net/?retryWrites=true&w=majority&appName=tc-store-admin`,
      {
        dbName: DataBaseName,
        enableUtf8Validation: true,
      },
    ),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
  ],
  providers: [],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/*');
  }
}
