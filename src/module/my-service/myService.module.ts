import { Module } from '@nestjs/common';
import { DB_COLLECTION } from 'src/common/mongoDB';
import { MongooseModule } from '@nestjs/mongoose';
import { MyServiceService } from './myService.service';
import { MyService, MyServiceSchema } from './schemas/myService.schema';
import { MyServiceController } from './myService.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MyService.name,
        schema: MyServiceSchema,
        collection: DB_COLLECTION.MyService,
      },
    ]),
  ],
  controllers: [MyServiceController],
  providers: [MyServiceService],
})
export class MyServiceModule {}
