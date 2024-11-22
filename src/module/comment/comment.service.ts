import { Body, Injectable, Param, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { Comment } from './Schema/coment.schema';
import { CloudinaryService } from 'src/services/cloudinary';
import { DB_COLLECTION, PATH_IMG } from 'src/common/mongoDB';
import { decryptData } from 'src/utils/crypto';
import { getIdObject, isObject } from 'src/utils/function';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async getComment(@Param() param, @Query() query): Promise<Comment[] | null> {
    const pipeline: PipelineStage[] = [
      {
        $match: { idProduct: getIdObject(param.idProduct) },
      },

      {
        $lookup: {
          from: DB_COLLECTION.User,
          localField: 'sdt',
          foreignField: 'sdt',
          as: 'user',
          pipeline: [
            {
              $project: {
                avatar: 1,
                _id: 0,
              },
            },
          ],
        },
      },

      {
        $sort: { date: -1 },
      },
    ];
    const data = await FunService.getDataByAggregate(
      this.commentModel,
      query,
      pipeline,
    );
    return data;
  }

  async getCommentUserByIDProduct(@Param() param): Promise<Comment | null> {
    const data = await FunService.getOneData(this.commentModel, {
      idProduct: getIdObject(param.idProduct),
      sdt: param.sdt,
    });
    return data;
  }

  async updateComment(
    @Param() param,
    @Body() bodyEncode,
  ): Promise<Comment | null> {
    const body = decryptData(bodyEncode.data);
    if (!body) {
      return null;
    }
    const dataUpdate = {
      ...body,
    };
    if (body.listImg) {
      dataUpdate.listImg = await CloudinaryService.getUrlByData(
        body.listImg,
        PATH_IMG.Comment,
      );
    }

    const data = await FunService.updateData(
      this.commentModel,
      param._id.toString(),
      dataUpdate,
    );
    return data;
  }

  async deleteComment(@Param() param): Promise<Comment | null> {
    const data = await FunService.deleteDataByID(
      this.commentModel,
      getIdObject(param._id),
    );
    return data;
  }

  async createComment(@Body() bodyEncode): Promise<Comment | null> {
    try {
      const body = decryptData(bodyEncode.data);
      if (!body) {
        return null;
      }

      const listUrl = await CloudinaryService.getUrlByData(
        body.listImg,
        PATH_IMG.Comment,
      );

      const bodyData: Comment = {
        date: new Date().getTime().toString(),
        listImg: listUrl,
        idProduct: getIdObject(body.idProduct.toString()),
        like: 0,
        note: body.note,
        listReplay: [],
        sdt: body.sdt,
        name: body.name,
        rate: Number(body.rate),
      };
      const data = await FunService.create(this.commentModel, bodyData);
      return data;
    } catch (error) {
      return null;
    }
  }
}
