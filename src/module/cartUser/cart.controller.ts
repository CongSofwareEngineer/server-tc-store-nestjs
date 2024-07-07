import { Controller, Get } from '@nestjs/common';

@Controller()
export class CartController {
  constructor() {}

  @Get('/')
  getAllCart() {
    return 'hello';
  }
}
