import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { formatRes } from 'src/utils/function';

//hostname/product/Method
@Controller('product')
export class ProductionController {
  constructor(private readonly productService: ProductService) {}

  @Get('list-product')
  async getProductByTypeProduct(@Res() res, @Query() query) {
    const data = await this.productService.getProductByTypeProduct(query);
    return formatRes(res, data);
  }

  @Get(':id')
  async getProductByID(@Res() res, @Param() param) {
    const data = await this.productService.getProductByID(param.id);
    return formatRes(res, data);
  }

  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.productService.create(body);
    return formatRes(res, data);
  }

  @Post('update/:id')
  async updateProduct(@Res() res, @Body() body, @Param() param) {
    const data = await this.productService.updateProduct(param.id, body);
    return formatRes(res, data);
  }

  @Post('delete/:id')
  async deleteProduct(@Res() res, @Param() param) {
    const data = await this.productService.deleteProductByID(param.id);
    return formatRes(res, data);
  }
}
