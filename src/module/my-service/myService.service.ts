import { Body, Injectable } from '@nestjs/common';
import { MyService } from './schemas/myService.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { CloudinaryService } from 'src/services/cloudinary';

@Injectable()
export class MyServiceService {
  constructor(
    @InjectModel(MyService.name)
    private readonly myServiceModel: Model<MyService>,
  ) {}

  async getAll(): Promise<MyService[]> {
    return FunService.getFullDataByOption(this.myServiceModel);
  }

  async create(@Body() body): Promise<MyService> {
    const urlIcon = await CloudinaryService.uploadImg(body.file, '');
    const datDTO: MyService = {
      des: body.des,
      icon: urlIcon?.public_id?.toString(),
      title: body.title,
    };

    if (body.more) {
      datDTO.more = body.more;
    }

    return FunService.create(this.myServiceModel, body);
  }
}
