import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartUser, CartUserSchema } from './schemas/cart.schema';
import { DB_COLLECTION } from 'src/common/mongoDB';
import { ProductModule } from '../production/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([
      {
        name: CartUser.name,
        schema: CartUserSchema,
        collection: DB_COLLECTION.CartUser,
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
