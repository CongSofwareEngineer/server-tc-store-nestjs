import { Module } from '@nestjs/common';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';
import { BillModule } from '../bill/bill.module';

@Module({
  imports: [BillModule],
  controllers: [RevenueController],
  providers: [RevenueService],
})
export class RevenueModule {}
