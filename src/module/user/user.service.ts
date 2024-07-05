import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserByLimit(page: number, limit: number): Promise<User[]> {
    const skip = (page - 1) * limit;
    const data = await this.userModel.find().skip(skip).limit(limit).exec();
    return data;
  }

  async login(sdt: string, pass: string): Promise<User | null> {
    const dataUser = await this.userModel.findOne({
      sdt: sdt,
      pass: pass,
    });
    return dataUser;
  }

  async createUser(body: User): Promise<User> {
    const bodyUser: CreateUserDto = {
      addressShipper: body?.addressShipper || [],
      date: body?.date || Date.now(),
      exp: body.exp || 0,
      sdt: body?.sdt,
      sex: body?.sex || true,
      isAdmin: !!body?.isAdmin,
      name: body?.name || 'noname',
      pass: body?.pass,
      avatar: body?.avatar || '',
      address: body?.address || '',
    };
    const dataNew = await this.userModel.create(bodyUser);
    console.log({ dataNew });

    return dataNew;
  }

  async findUserByID(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async deleteUserByID(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
