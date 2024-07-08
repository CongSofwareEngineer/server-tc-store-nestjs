import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './module/cartUser/cart.module';

import { MongooseModule } from '@nestjs/mongoose';
import { DataBaseName } from './common/mongoDB';
import { UserModule } from './module/user/user.module';
import { TypeProductModule } from './module/typeProduct/typeProduct.module';
import { ProductModule } from './module/production/product.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    CarModule,
    ProductModule,
    UserModule,
    TypeProductModule,
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://hodiencong2000:diencong12c5@tc-store-admin.mpkyxqj.mongodb.net/?retryWrites=true&w=majority&appName=tc-store-admin`,
      {
        dbName: DataBaseName,
        enableUtf8Validation: true,
      },
    ),
  ],
})
export class AppModule {}
