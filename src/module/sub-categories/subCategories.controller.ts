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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { SubCategoriesService } from './subCategories.service';
import { SubCategories } from './schemas/subCategories.schema';
@ApiBearerAuth()
@ApiTags('Sub Categories')
@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Get('all')
  async getAllUser(@Res() response, @Query() query): Promise<SubCategories[]> {
    const data = await this.subCategoriesService.getAllType(query);
    return formatRes(response, data);
  }

  @Post('create')
  async createType(@Res() response, @Body() body): Promise<SubCategories> {
    const data = await this.subCategoriesService.createCategory(body);
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
    @Body() typeData: SubCategories,
  ): Promise<SubCategories> {
    const data = await this.subCategoriesService.updateCategory(
      param.id,
      typeData,
    );
    return formatRes(response, data);
  }

  @ApiParam({
    name: 'Id',
    required: true,
    description: 'Id',
  })
  @Delete('delete/:id')
  async deleteType(
    @Res() response,
    @Param() param,
  ): Promise<SubCategories | null> {
    const data = await this.subCategoriesService.deleteCategory(param);
    return formatRes(response, data);
  }
}
