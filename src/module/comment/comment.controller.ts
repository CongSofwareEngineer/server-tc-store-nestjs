import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { formatRes } from 'src/utils/function';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('list/:idProduct')
  async getComment(@Res() res, @Param() parma, @Query() query) {
    const data = await this.commentService.getComment(parma, query);
    return formatRes(res, data);
  }
}
