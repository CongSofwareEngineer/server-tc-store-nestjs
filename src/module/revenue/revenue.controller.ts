import { Controller, Get, Query, Res } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { formatRes } from 'src/utils/function';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('revenue')
@Controller('revenue')
export class RevenueController {
  constructor(private billService: RevenueService) {}

  @Get('all')
  async getAllRevenue(@Res() res, @Query() query) {
    const data = await this.billService.getAllRevenue(query);
    return formatRes(res, data);
  }
}
