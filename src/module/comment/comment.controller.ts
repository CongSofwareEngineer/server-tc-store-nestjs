import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { formatRes } from 'src/utils/function';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiParam({
    name: 'idProduct',
    required: true,
    description: 'idProduct',
  })
  @Get('detail/:idProduct')
  async getComment(@Res() res, @Param() parma, @Query() query) {
    const data = await this.commentService.getComment(parma, query);
    return formatRes(res, data);
  }

  @Post('update/:_id')
  async updateComment(@Res() res, @Param() parma, @Body() body) {
    const data = await this.commentService.updateComment(parma, body);
    return formatRes(res, data);
  }
}
