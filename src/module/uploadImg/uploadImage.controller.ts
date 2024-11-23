import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { formatRes } from 'src/utils/function';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UploadImgService } from './uploadImage.service';

//hostname/product/Method
@ApiBearerAuth()
@ApiTags('Upload image')
@Controller('upload-image')
export class UploadImgController {
  constructor(private readonly uploadImgService: UploadImgService) {}

  @Post('upload')
  async upload(@Res() res, @Body() body) {
    const data = await this.uploadImgService.upload(body);
    return formatRes(res, data);
  }
}
