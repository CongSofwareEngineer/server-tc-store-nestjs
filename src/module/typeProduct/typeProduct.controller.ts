import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { formatRes } from 'src/utils/function';
import { TypeProduct } from './schemas/typeProduct.schema';
import { TypeProductService } from './typeProduct.service';

@Controller('category')
export class TypeProductController {
  constructor(private readonly typeProductService: TypeProductService) {}

  @Get('all')
  async getAllUser(@Res() response): Promise<TypeProduct[]> {
    try {
      const data = await this.typeProductService.getAllType();
      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }

  @Post('create')
  async createUser(
    @Res() response,
    @Body() typeData: TypeProduct,
  ): Promise<TypeProduct> {
    try {
      const data = await this.typeProductService.createTypeProduct(typeData);
      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }
}
