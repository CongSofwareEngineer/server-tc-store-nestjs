import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_COLLECTION } from 'src/common/mongoDB';
import { SubCategoriesController } from './subCategories.controller';
import {
  SubCategories,
  SubCategoriesSchema,
} from './schemas/subCategories.schema';
import { SubCategoriesService } from './subCategories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubCategories.name,
        schema: SubCategoriesSchema,
        collection: DB_COLLECTION.SubCategories,
      },
    ]),
  ],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
