import { Module } from '@nestjs/common';
import { TypeProductService } from './typeProduct.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeProduct, TypeProductSchema } from './schemas/typeProduct.schema';
import { BDCollection } from 'src/common/mongoDB';
import { TypeProductController } from './typeProduct.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TypeProduct.name,
        useFactory: () => {
          const schema = TypeProductSchema;
          schema.pre('save', function () {
            console.log('Hello from pre save');
          });
          return schema;
        },
        collection: BDCollection.TypeProduct,
      },
    ]),
  ],
  controllers: [TypeProductController],
  providers: [TypeProductService],
})
export class TypeProductModule {}
