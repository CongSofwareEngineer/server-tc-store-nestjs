import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { formatRes } from 'src/utils/function';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('/refresh')
  async refreshToken(@Res() res, @Request() req) {
    const token = req.headers.authorization;
    const dataVerify = await AuthService.verifyAth(token, true);
    if (dataVerify?.id && dataVerify?.sdt) {
      const tokenAccess = AuthService.generateAuthAccess(
        dataVerify.id,
        dataVerify.sdt,
      );
      return formatRes(res, { token: tokenAccess });
    }
    return formatRes(res, null);
  }
}
