import { Body, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/services/cloudinary';
import { decryptData } from 'src/utils/crypto';

@Injectable()
export class UploadImgService {
  async upload(@Body() bodyEncode) {
    try {
      const body = decryptData(bodyEncode.data);
      if (!body) {
        return null;
      }

      const img = CloudinaryService.uploadImg(body?.file, body?.path);
      return img;
    } catch (error) {
      return null;
    }
  }
}
