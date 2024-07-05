import { Module } from '@nestjs/common';
import { TypeProductService } from './typeProduct.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeProduct, TypeProductSchema } from './schemas/typeProduct.schema';
import { BDCollection } from 'src/common/mongoDB';
import { TypeProductController } from './typeProduct.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TypeProduct.name,
        schema: TypeProductSchema,
        collection: BDCollection.TypeProduct,
      },
    ]),
  ],
  controllers: [TypeProductController],
  providers: [TypeProductService],
})
export class TypeProductModule {}
