import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MyServiceService } from './myService.service';
import { formatRes } from 'src/utils/function';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('My service')
@Controller('my-service')
export class MyServiceController {
  constructor(private readonly myService: MyServiceService) {}

  @Get('/all')
  async getAll(@Res() res) {
    const data = await this.myService.getAll();
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'body',
    required: true,
    description: 'body api',
  })
  @ApiBody({
    description: 'body User',
    required: true,
    type: Object,
  })
  @Post('/create')
  async create(@Res() res, @Body() body) {
    const data = await this.myService.create(body);
    return formatRes(res, data);
  }
}
