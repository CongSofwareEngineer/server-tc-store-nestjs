import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

import { formatRes } from 'src/utils/function';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { ContactMeService } from './contactMe.service';
import { ContactMe } from './schemas/contactMe.schema';

@ApiBearerAuth()
@ApiTags('Contact')
@Controller('contact-me')
export class ContactMeController {
  constructor(private readonly contactMeService: ContactMeService) {}

  @Get('/all')
  async getAll(@Res() res) {
    const data = await this.contactMeService.getAll();
    return formatRes(res, data);
  }

  @ApiBody({
    description: 'body Contact Me ',
    required: true,
    type: Object,
  })
  @Post('/create')
  async create(@Res() res, @Body() body) {
    try {
      const data = await this.contactMeService.create(body);
      if (!data) {
        return formatRes(res, { error: 'email exited' }, true);
      }
      return formatRes(res, data);
    } catch (error) {
      return formatRes(res, { error }, true);
    }
  }

  @ApiBody({ type: ContactMe })
  @Post('/update')
  async update(@Res() res, @Body() body) {
    const data = await this.contactMeService.update(body);
    return formatRes(res, data);
  }
}
