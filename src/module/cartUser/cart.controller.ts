import { Body, Controller, Get, Param, Post, Res, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { formatRes } from 'src/utils/function';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':idUser')
  async getCartByIdUser(@Res() res, @Param() param, @Query() query) {
    const page = query?.page || 1;
    const limit = Number(query?.limit || 1);

    const data = await this.cartService.getCartByIdUser(
      param.idUser,
      page,
      limit,
    );
    return formatRes(res, data);
  }

  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.cartService.create(body);
    return formatRes(res, data);
  }

  @Post('delete-cart/:id')
  async deleteCart(@Res() res, @Param() param) {
    const data = await this.cartService.deleteCart(param.id);
    return formatRes(res, data);
  }

  @Post('update-cart/:id')
  async updateCart(@Res() res, @Param() param, @Body() body) {
    const data = await this.cartService.updateCart(param.id, body);
    return formatRes(res, data);
  }
}
