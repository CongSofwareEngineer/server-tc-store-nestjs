import { Body, Controller, Post, Res } from '@nestjs/common';
import { MomoService } from './momo.service';
import { formatRes } from 'src/utils/function';

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Post('create')
  async createPayment(@Res() res, @Body() createPaymentDto: any) {
    const { orderId, amount, returnUrl, notifyUrl } = createPaymentDto;
    const data = await this.momoService.createPayment(
      orderId,
      amount,
      returnUrl,
      notifyUrl,
    );
    return formatRes(res, data);
  }
}
