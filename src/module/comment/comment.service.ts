import { Injectable, Param, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FunService } from 'src/utils/funcService';
import { Comment } from './Schema/coment.schema';

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
}
