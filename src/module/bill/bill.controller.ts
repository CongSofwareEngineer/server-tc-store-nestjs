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
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Bill } from './schemas/bill.schema';
@ApiBearerAuth()
@ApiTags('bill')
@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Get('datetime')
  async getDateTime(@Res() res) {
    return formatRes(res, { time: new Date().getTime().toString() });
  }

  @Get('all')
  async getAllBill(@Res() res, @Query() query) {
    const data = await this.billService.getAllBill(query);
    return formatRes(res, data);
  }

  @Get('admin/all')
  async getAllBillAdmin(@Res() res: Response, @Query() query) {
    const data = await this.billService.getAllBillAdmin(query);
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

  @ApiBody({
    type: Bill,
  })
  @Post('create')
  async createBill(@Res() res, @Body() body) {
    const data = await this.billService.create(body);
    return formatRes(res, data);
  }

  @ApiBody({
    type: Bill,
  })
  @Post('update/:id')
  async updateBill(@Res() res, @Body() body, @Param() param) {
    const data = await this.billService.updateBill(body, param);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id Bill',
  })
  @Delete('delete/:id')
  async deleteBill(@Res() res, @Param() param) {
    const data = await this.billService.deleteBillByID(param.id);
    return formatRes(res, data);
  }
}
