import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { formatRes } from 'src/utils/function';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
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

  @ApiParam({
    name: 'idProduct',
    required: true,
    description: 'idProduct',
  })
  @Delete('detail/:_id')
  async deleteComment(@Res() res, @Param() parma) {
    const data = await this.commentService.deleteComment(parma);
    return formatRes(res, data);
  }

  @ApiParam({
    name: '_id',
    required: true,
    description: '_id',
  })
  @ApiBody({
    description: 'updater',
    required: true,
    type: Object,
  })
  @Post('update/:_id')
  async updateComment(@Res() res, @Param() parma, @Body() body) {
    const data = await this.commentService.updateComment(parma, body);
    return formatRes(res, data);
  }

  @ApiBody({
    description: 'create',
    required: true,
    type: Object,
  })
  @Post('create')
  async createComment(@Res() res, @Body() body) {
    const data = await this.commentService.createComment(body);
    return formatRes(res, data);
  }
}
