import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { DBCollection } from 'src/common/mongoDB';
import { ProductionController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
        collection: DBCollection.Production,
      },
    ]),
  ],
  controllers: [ProductionController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
