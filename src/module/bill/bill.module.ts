import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schemas/bill.schema';
import { DB_COLLECTION } from 'src/common/mongoDB';
import { ProductModule } from '../production/product.module';
import { CartModule } from '../cartUser/cart.module';

@Module({
  imports: [
    CartModule,
    ProductModule,
    MongooseModule.forFeature([
      {
        name: Bill.name,
        schema: BillSchema,
        collection: DB_COLLECTION.Bill,
      },
    ]),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
