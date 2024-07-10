import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { formatRes } from 'src/utils/function';
import { TypeProduct } from './schemas/typeProduct.schema';
import { TypeProductService } from './typeProduct.service';

@Controller('category')
export class TypeProductController {
  constructor(private readonly typeProductService: TypeProductService) {}

  @Get('all')
  async getAllUser(@Res() response): Promise<TypeProduct[]> {
    const data = await this.typeProductService.getAllType();
    return formatRes(response, data);
  }

  @Post('create')
  async createType(
    @Res() response,
    @Body() typeData: TypeProduct,
  ): Promise<TypeProduct> {
    const data = await this.typeProductService.createTypeProduct(typeData);
    return formatRes(response, data);
  }

  @Post('delete/:id')
  async deleteType(
    @Res() response,
    @Param() param,
  ): Promise<TypeProduct | null> {
    const data = await this.typeProductService.deleteType(param);
    return formatRes(response, data);
  }
}
