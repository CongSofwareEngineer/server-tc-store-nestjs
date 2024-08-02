import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { ContactMe } from './schemas/contactMe.schema';

@Injectable()
export class ContactMeService {
  constructor(
    @InjectModel(ContactMe.name)
    private readonly contactMeModel: Model<ContactMe>,
  ) {}

  async getAll(): Promise<ContactMe[]> {
    return FunService.getFullDataByOption(this.contactMeModel);
  }

  async create(@Body() body): Promise<ContactMe | null> {
    const isExited = await FunService.getOneData(this.contactMeModel, {
      emailUser: body.emailUser.toString(),
    });

    if (isExited) {
      return null;
    }
    return FunService.create(this.contactMeModel, body);
  }
}
