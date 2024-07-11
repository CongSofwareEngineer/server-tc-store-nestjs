import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { formatRes } from 'src/utils/function';
import { Category } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  async getAllUser(@Res() response): Promise<Category[]> {
    const data = await this.categoryService.getAllType();
    return formatRes(response, data);
  }

  @Post('create')
  async createType(
    @Res() response,
    @Body() typeData: Category,
  ): Promise<Category> {
    const data = await this.categoryService.createCategory(typeData);
    return formatRes(response, data);
  }

  @ApiParam({
    name: 'Id',
    required: true,
    description: 'Id',
  })
  @Delete('delete/:id')
  async deleteType(@Res() response, @Param() param): Promise<Category | null> {
    const data = await this.categoryService.deleteCategory(param);
    return formatRes(response, data);
  }
}
