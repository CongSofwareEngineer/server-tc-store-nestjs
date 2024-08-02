import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { join } from 'path';
cloudinary.config({
  api_key: '359654788484534',
  api_secret: 'vOHwtW8xux5KIzklJ2RgQkbE-Bk',
  cloud_name: 'tc-store',
});
export class CloudinaryService {
  static async uploadImg(file: any, path = '') {
    cloudinary.uploader.destroy(file.public_id);
    const result = await cloudinary.uploader.upload(file.base64, {
      folder: path || 'tc-store/users',
      public_id: `${file.name}-${new Date().getTime()}`,
      async: true,

      use_filename: true,
      type: 'upload',
      overwrite: true,
    });
    return result;
  }

  static async uploadImgSystem() {
    const filePath = join(__dirname, '..', 'images', 'avatarDefault.png');

    const byteArrayBuffer = fs.readFileSync(filePath, 'utf8');
    const result = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          console.log({ uploadResult });

          return resolve(uploadResult);
        })
        .end(byteArrayBuffer);
    }).then((uploadResult) => {
      console.log(`Buffer upload_stream wth promise success - ${uploadResult}`);
    });
    console.log('====================================');
    console.log({ result });
    console.log('====================================');
    return result;
  }
}
