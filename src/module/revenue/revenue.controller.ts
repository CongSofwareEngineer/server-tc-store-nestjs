import { Controller, Get, Query, Res } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { formatRes } from 'src/utils/function';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('revenue')
@Controller('revenue')
export class RevenueController {
  constructor(private billService: RevenueService) {}

  @Get('admin/limit')
  async getRevenue(@Res() res, @Query() query) {
    const data = await this.billService.getRevenue(query);
    return formatRes(res, data);
  }

  @Get('admin/full')
  async getFullRevenue(@Res() res, @Query() query) {
    const data = await this.billService.getFullRevenue(query);
    return formatRes(res, data);
  }
}
