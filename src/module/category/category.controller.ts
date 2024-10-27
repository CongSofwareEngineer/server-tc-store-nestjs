import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { formatRes } from 'src/utils/function';
import { Category } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  async getAllUser(@Res() response, @Query() query): Promise<Category[]> {
    const data = await this.categoryService.getAllType(query);
    return formatRes(response, data);
  }

  @Post('create')
  async createType(@Res() response, @Body() body): Promise<Category> {
    const data = await this.categoryService.createCategory(body);
    return formatRes(response, data);
  }

  @ApiParam({
    name: 'Id',
    required: true,
    description: 'Id',
  })
  @Put('update/:id')
  async updateType(
    @Res() response,
    @Param() param,
    @Body() typeData: Category,
  ): Promise<Category> {
    const data = await this.categoryService.updateCategory(param.id, typeData);
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
