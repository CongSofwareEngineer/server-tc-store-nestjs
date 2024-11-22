import { Body, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { ContactMe } from './schemas/contactMe.schema';
import { decryptData } from 'src/utils/crypto';
import { getIdObject } from 'src/utils/function';

@Injectable()
export class ContactMeService {
  constructor(
    @InjectModel(ContactMe.name)
    private readonly contactMeModel: Model<ContactMe>,
  ) {}

  async getAll(): Promise<ContactMe[]> {
    return FunService.getFullDataByOption(this.contactMeModel);
  }

  async update(@Body() bodyEncode): Promise<ContactMe> {
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    const dataUpdate: ContactMe = {
      des: body.des,
    };
    return FunService.updateData(
      this.contactMeModel,
      getIdObject(body.id),
      dataUpdate,
    );
  }

  async create(@Body() bodyEncode): Promise<ContactMe | null> {
    let dataExited: ContactMe = null;
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    if (body.emailUser) {
      dataExited = await FunService.getOneData(this.contactMeModel, {
        emailUser: body.emailUser.toString(),
      });
    }

    if (body.sdt) {
      dataExited = await FunService.getOneData(this.contactMeModel, {
        sdt: body.sdt.toString(),
      });
    }

    if (dataExited) {
      return null;
    }

    return FunService.create(this.contactMeModel, body);
  }
}
