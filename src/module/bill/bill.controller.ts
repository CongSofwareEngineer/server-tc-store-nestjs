import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { BillService } from './bill.service';
import { formatRes } from 'src/utils/function';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Get('user/:idUser')
  async getBill(@Res() res, @Query() query) {
    const data = await this.billService.getBillByLimit(query);
    return formatRes(res, data);
  }

  @Post('create')
  async createBill(@Res() res, @Body() body) {
    const data = await this.billService.create(body);
    return formatRes(res, data);
  }
}
