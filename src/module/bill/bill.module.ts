import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schemas/bill.schema';
import { DB_COLLECTION } from 'src/common/mongoDB';
import { ProductModule } from '../production/product.module';
import { CartModule } from '../cartUser/cart.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CartModule,
    ProductModule,
    UserModule,
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
  exports: [BillService],
})
export class BillModule {}
