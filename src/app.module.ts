import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DataBaseName } from './common/mongoDB';
import { UserModule } from './module/user/user.module';
import { TypeProductModule } from './module/typeProduct/typeProduct.module';
import { ProductModule } from './module/production/product.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeProductModule,
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
  ],
})
export class AppModule {}
