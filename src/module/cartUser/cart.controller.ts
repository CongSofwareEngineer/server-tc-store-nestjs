import { Body, Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class CartController {
  constructor() {}

  @Get('/')
  async getAllCart() {
    const data = await axios.post(
      'https://test-payment.momo.vn/v2/gateway/api/create',
      {
        Body: {
          partnerCode: 'MOMOBKUN20180529',
          partnerName: 'Test',
          storeId: 'Merchant',
          requestType: 'captureWallet',
          ipnUrl: 'https://webhook.site/94e534cb-a54a-4313-8e91-c42f7aa2e145',
          redirectUrl:
            'https://webhook.site/94e534cb-a54a-4313-8e91-c42f7aa2e145',
          orderId: '1629181466064:0123456778',
          amount: '10000',
          lang: 'en',
          autoCapture: false,
          orderInfo: 'Thanh toán qua ví MoMo',
          requestId: 'f7a8f62f4234-0bba-405f-8178-1a516ea1fe3c',
          extraData: '',
          signature:
            'a0e6c8676f651f4d8980f04d10ee562fe027d9bacb7df0031c32e3ca42096473',
        },
      },
    );
    console.log('====================================');
    console.log({ data });
    console.log('====================================');
    return 'hello';
  }
}
