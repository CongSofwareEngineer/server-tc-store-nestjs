import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { formatRes } from 'src/utils/function';
import { ApiParam } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiParam({
    name: 'idProduct',
    required: true,
    description: 'idProduct',
  })
  @Get('list/:idProduct')
  async getComment(@Res() res, @Param() parma, @Query() query) {
    const data = await this.commentService.getComment(parma, query);
    return formatRes(res, data);
  }
}
