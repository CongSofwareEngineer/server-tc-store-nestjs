import { Injectable, Param, Query } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { FunService } from 'src/utils/funcService';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(sdt: string) {
    return this.userModel.findOne({
      sdt: sdt,
    });
  }
  async getUserByID(@Param() params): Promise<User> {
    return FunService.findDataByID(this.userModel, params._id);
  }

  async getAllUser(): Promise<User[]> {
    const data = await this.userModel.find().exec();
    return data;
  }

  async getUserByLimit(@Query() query): Promise<User[]> {
    return FunService.getDataByLimit(this.userModel, query);
  }

  async login(sdt: string, pass: string): Promise<User | null> {
    const dataUser = await FunService.getOneData(this.userModel, {
      sdt: sdt,
      pass: pass,
    });
    if (!dataUser) {
      return null;
    }
    const auth = AuthService.generateAuth(dataUser._id, dataUser.sdt);
    dataUser.auth = auth.tokenAccess;
    dataUser.authRefresh = auth.tokenRefresh;
    return dataUser;
  }

  async loginRefresh(sdt: string, pass: string): Promise<User | null> {
    const dataUser = await FunService.getOneData(this.userModel, {
      sdt: sdt,
      pass: pass,
    });
    if (!dataUser) {
      return null;
    }
    return dataUser;
  }

  async createUser(body: User): Promise<User | null> {
    const exitedAccount = await this.findOne(body?.sdt);
    if (exitedAccount) {
      return null;
    }

    const bodyUser: User = {
      addressShipper: body?.addressShipper || [],
      date: new Date().getTime().toFixed(),
      exp: body.exp || 0,
      sdt: body?.sdt,
      sex: body?.sex || true,
      isAdmin: !!body?.isAdmin,
      name: body?.name || body?.sdt || 'noname',
      pass: body?.pass,
      avatar: body?.avatar || '',
      address: body?.address || '',
    };

    const dataNew = await FunService.create(this.userModel, bodyUser);
    return dataNew;
  }

  async findUserByID(id: string): Promise<User | null> {
    return FunService.findDataByID(this.userModel, id);
  }

  async deleteUserByID(id: string): Promise<any | null> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
