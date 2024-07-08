import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
@Injectable()
export class MomoService {
  private partnerCode = process.env.MOMO_PARTNER_CODE;
  private accessKey = process.env.MOMO_ACCESS_KEY;
  private secretKey = process.env.MOMO_SECRET_KEY;
  private endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';

  async createPayment(
    orderId: string,
    amount: number,
    returnUrl: string,
    notifyUrl: string,
  ) {
    const requestId = orderId;
    const orderInfo = 'Payment for order ' + orderId;
    const requestType = 'captureWallet';
    const extraData = ''; // Pass empty value if there is no extra data

    const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${notifyUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${returnUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: this.partnerCode,
      accessKey: this.accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl: returnUrl,
      ipnUrl: notifyUrl,
      extraData,
      requestType,
      signature,
    };

    try {
      const response = await axios.post(this.endpoint, requestBody);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create payment');
    }
  }
}
