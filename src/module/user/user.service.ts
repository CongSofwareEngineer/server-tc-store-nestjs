import { Body, Injectable, Param, Query } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { FunService } from 'src/utils/funcService';
import { CloudinaryService } from 'src/services/cloudinary';
import { decryptData } from 'src/utils/crypto';
import { getQueryDB } from 'src/utils/function';
import { KEY_OPTION_FILTER_DB, PATH_IMG } from 'src/common/mongoDB';

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

  async getUserInAdmin(@Query() query): Promise<User[]> {
    const queryBase = getQueryDB(query, KEY_OPTION_FILTER_DB.User);

    const data = await FunService.getDataByAggregate(this.userModel, query, [
      queryBase,
    ]);
    return data;
  }

  async getUserByLimit(@Query() query): Promise<User[]> {
    return FunService.getDataByLimit(this.userModel, query);
  }

  async updateAvatarUser(
    @Param() param,
    @Body() bodyEncode,
  ): Promise<User | null> {
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    const dataImg = await CloudinaryService.getUrlByData(
      body.file,
      PATH_IMG.Users,
    );

    if (!dataImg) {
      return null;
    }

    if (body?.publicId) {
      CloudinaryService.deleteImgByData(body?.publicId);
    }

    return FunService.updateData(this.userModel, param._id.toString(), {
      avatar: dataImg,
    });
  }

  async updateUser(@Param() param, @Body() bodyEncode): Promise<User | null> {
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    return FunService.updateData(this.userModel, param._id.toString(), body);
  }

  async login(@Body() bodyEncode): Promise<User | null> {
    try {
      const body = decryptData(bodyEncode?.data);
      if (!body) {
        return null;
      }
      const dataDecode = JSON.parse(decryptData(body.data));
      const dataUser = await FunService.getOneData(this.userModel, {
        sdt: dataDecode.sdt,
        pass: dataDecode.pass,
      });
      if (!dataUser) {
        return null;
      }
      const auth = AuthService.generateAuth(dataUser._id, dataUser.sdt);
      dataUser.auth = auth.tokenAccess;
      dataUser.authRefresh = auth.tokenRefresh;
      return dataUser;
    } catch (error) {
      console.log({ error });

      return null;
    }
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

  async createUser(@Body() bodyEncode): Promise<User | null> {
    const body: User = decryptData(bodyEncode?.data);
    if (!body) {
      return null;
    }
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
