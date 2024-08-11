import { Body, Injectable, Param, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { Comment } from './Schema/coment.schema';
import { CloudinaryService } from 'src/services/cloudinary';
import { PATH_IMG } from 'src/common/mongoDB';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async getComment(@Param() param, @Query() query): Promise<Comment[] | null> {
    const data = await FunService.getDataByOptions(
      this.commentModel,
      query,
      {
        idProduct: new Types.ObjectId(param.idProduct),
      },
      {},
      { date: -1 },
    );
    return data;
  }

  async updateComment(@Param() param, @Body() body): Promise<Comment | null> {
    const data = await FunService.updateData(
      this.commentModel,
      param._id.toString(),
      body,
    );
    return data;
  }

  async deleteComment(@Param() param): Promise<Comment | null> {
    const data = await FunService.deleteDataByID(
      this.commentModel,
      new Types.ObjectId(param._id),
    );
    return data;
  }

  async createComment(@Body() body): Promise<Comment | null> {
    try {
      const listFun = body.listImg.map((e) => {
        return CloudinaryService.uploadImg(e, PATH_IMG.Comment);
      });
      const listData = await Promise.all(listFun);
      const listUrl = listData.map((e) => e.public_id);
      const bodyData: Comment = {
        date: new Date().getTime().toString(),
        listImg: listUrl,
        isProduct: new Types.ObjectId(body.idProduct.toString()),
        like: 0,
        note: body.note,
        listReplay: [],
        sdt: body.sdt,
        name: body.name,
        rate: Number(body.rate),
      };
      const data = await FunService.create(this.commentModel, bodyData);
      return data;
    } catch (error) {}
  }
}
