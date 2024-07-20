import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { DB_COLLECTION } from 'src/common/mongoDB';
import { ProductionController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
        collection: DB_COLLECTION.Production,
      },
    ]),
  ],
  controllers: [ProductionController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
