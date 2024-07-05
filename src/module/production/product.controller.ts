import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { formatRes } from 'src/utils/function';

//hostname/product/Mothod
@Controller('product')
export class ProductionController {
  constructor(private readonly productService: ProductService) {}

  @Get('/list-product')
  async getProductByLimit(@Res() res, @Query() query) {
    const data = await this.productService.getProductByLimit(query);
    return formatRes(res, data);
  }

  @Post('/list-product/:id')
  async updateProduct(@Res() res, @Body() body, @Param() param) {
    const data = await this.productService.updateProduct(param.id, body);
    return formatRes(res, data);
  }
}
