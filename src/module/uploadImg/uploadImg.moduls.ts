import { Module } from '@nestjs/common';
import { UploadImgController } from './uploadImage.controller';
import { UploadImgService } from './uploadImage.service';

@Module({
  imports: [],
  controllers: [UploadImgController],
  providers: [UploadImgService],
  exports: [UploadImgService],
})
export class UploadImgModule {}
