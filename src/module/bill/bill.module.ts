import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schemas/bill.schema';
import { DBCollection } from 'src/common/mongoDB';
import { ProductModule } from '../production/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([
      {
        name: Bill.name,
        schema: BillSchema,
        collection: DBCollection.Bill,
      },
    ]),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
