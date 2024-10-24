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
import { ProductService } from './product.service';
import { formatRes } from 'src/utils/function';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

//hostname/product/Method
@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductionController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async getAllProduct(@Res() res, @Query() query) {
    const data = await this.productService.getAllProduct(query);
    return formatRes(res, data);
  }

  @Get('admin/all')
  async getListProductAdmin(@Res() res, @Query() query) {
    const data = await this.productService.getListProductAdmin(query);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id',
  })
  @Get('detail/:id')
  async getProductByID(@Res() res, @Param() param) {
    const data = await this.productService.getProductByID(param.id);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'keyName',
    required: true,
    description: 'keyName',
  })
  @Get('detail-keyName/:keyName')
  async getProductByKeyName(@Res() res, @Param() param) {
    const data = await this.productService.getProductByKeyName(param.keyName);
    return formatRes(res, data);
  }

  @ApiBody({
    description: 'Create',
    required: true,
    type: Object,
  })
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.productService.create(body);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id',
  })
  @ApiBody({
    description: 'Update',
    required: true,
    type: Object,
  })
  @Post('update/:id')
  async updateProduct(@Res() res, @Body() body, @Param() param) {
    const data = await this.productService.updateProduct(param.id, body);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id',
  })
  @Delete('delete/:id')
  async deleteProduct(@Res() res, @Param() param) {
    const data = await this.productService.deleteProductByID(param);
    return formatRes(res, data);
  }
}
