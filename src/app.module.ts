import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './module/cartUser/cart.module';

import { MongooseModule } from '@nestjs/mongoose';
import { DB_NAME } from './common/mongoDB';
import { UserModule } from './module/user/user.module';
import { CategoryModule } from './module/category/category.module';
import { ProductModule } from './module/production/product.module';
import { AuthModule } from './module/auth/auth.module';
import { MomoModule } from './module/momo/momo.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerMiddleware } from './logger.middleware';
import { BillModule } from './module/bill/bill.module';
import { CommentModule } from './module/comment/comment.module';
import { MyServiceModule } from './module/my-service/myService.module';
import { ContactMeModule } from './module/contact-me/contactMe.module';
import { RevenueModule } from './module/revenue/revenue.module';
import { EventsModule } from './module/socket/events.module';
import { UploadImgModule } from './module/uploadImg/uploadImg.moduls';
import { SubCategoriesModule } from './module/sub-categories/subCategories.module';

@Module({
  imports: [
    UploadImgModule,
    EventsModule,
    MyServiceModule,
    ContactMeModule,
    AuthModule,
    MomoModule,
    CartModule,
    ProductModule,
    UserModule,
    CategoryModule,
    SubCategoriesModule,
    BillModule,
    RevenueModule,
    CommentModule,
    ConfigModule.forRoot({
      envFilePath: '.env.test.local',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USER_NAME_MONGO}:${process.env.PASSWORD_MONGO}@tc-store-admin.mpkyxqj.mongodb.net/?retryWrites=true&w=majority&appName=tc-store-admin`,
      {
        dbName: DB_NAME,
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
