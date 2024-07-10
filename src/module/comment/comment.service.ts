import { Injectable, Param, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FunService } from 'src/utils/funcService';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async getComment(@Param() param, @Query() query): Promise<Comment[] | null> {
    const data = await FunService.findDataByOptions(this.commentModel, query, {
      idProduct: param.idProduct,
    });
    return data;
  }
}
