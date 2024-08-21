import { Inject, Injectable, Query } from '@nestjs/common';
import { BillService } from '../bill/bill.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
@Injectable()
export class RevenueService {
  constructor(@Inject(BillService) private readonly billService: BillService) {}

  async getAllRevenue(@Query() query) {
    const data = await this.billService.getFullBillAdmin(query);

    return data;
  }
}
