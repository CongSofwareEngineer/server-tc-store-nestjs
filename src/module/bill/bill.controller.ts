import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { formatRes } from 'src/utils/function';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('bill')
@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Get('all')
  async getAllBill(@Res() res, @Query() query) {
    const data = await this.billService.getAllBill(query);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'idUser',
    required: true,
    description: 'Id user',
  })
  @Get('detail/:idUser')
  async getBill(@Res() res, @Query() query, @Param() param) {
    const data = await this.billService.getBillByIDUser(query, param.idUser);
    return formatRes(res, data);
  }

  @Post('create')
  async createBill(@Res() res, @Body() body) {
    const data = await this.billService.create(body);
    return formatRes(res, data);
  }

  @Post('update/:id')
  async updateBill(@Res() res, @Body() body, @Param() param) {
    const data = await this.billService.updateBill(param.id, body);
    return formatRes(res, data);
  }

  @Delete('delete/:id')
  async deleteBill(@Res() res, @Param() param) {
    const data = await this.billService.deleteBillByID(param.id);
    return formatRes(res, data);
  }
}
