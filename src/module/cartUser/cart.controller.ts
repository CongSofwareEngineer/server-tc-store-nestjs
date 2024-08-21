import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Query,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { formatRes } from 'src/utils/function';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('all')
  async getAllCart(@Res() res, @Query() query) {
    const data = await this.cartService.getAllCart(query);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'idUser',
    required: true,
    description: 'Id user',
  })
  @Get('detail/:idUser')
  async getCartByIdUser(@Res() res, @Param() param, @Query() query) {
    const data = await this.cartService.getCartByIdUser(param.idUser, query);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'idUser',
    required: true,
    description: 'Id user',
  })
  @ApiParam({
    name: 'idProduct',
    required: true,
    description: 'idProduct',
  })
  @Get('details/:idUser/:idProduct')
  async getCartByIdUserIdPro(@Res() res, @Param() param) {
    const data = await this.cartService.getCartByIdUserIdPro(param);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'idUser',
    required: true,
    description: 'Id user',
  })
  @Get('length-cart/:idUser')
  async getLengthCartByIdUser(@Res() res, @Param() param) {
    const data = await this.cartService.getLengthCartByIdUser(param);
    return formatRes(res, data);
  }

  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.cartService.create(body);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id cart',
  })
  @Delete('delete/:id')
  async deleteCart(@Res() res, @Param() param) {
    const data = await this.cartService.deleteCart(param.id);
    return formatRes(res, data);
  }

  @ApiParam({
    name: 'Id',
    required: true,
    description: 'Id',
  })
  @Post('update-cart/:id')
  async updateCart(@Res() res, @Param() param, @Body() body) {
    const data = await this.cartService.updateCart(param.id, body);
    return formatRes(res, data);
  }
}
