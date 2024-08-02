import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { formatRes } from 'src/utils/function';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ContactMeService } from './contactMe.service';

@ApiTags('My service')
@Controller('my-service')
export class ContactMeController {
  constructor(private readonly contactMeService: ContactMeService) {}

  @Get('/all')
  async getAll(@Res() res) {
    const data = await this.contactMeService.getAll();
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'body',
    required: true,
    description: 'body api',
  })
  @ApiBody({
    description: 'body Contact Me ',
    required: true,
    type: Object,
  })
  @Post('/create')
  async create(@Res() res, @Body() body) {
    const data = await this.contactMeService.create(body);
    return formatRes(res, data);
  }
}
