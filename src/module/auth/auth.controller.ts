import { Controller, Post, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { formatRes } from 'src/utils/function';
import { isBoolean } from 'class-validator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('/refresh')
  async refreshToken(@Res() res, @Request() req) {
    const token = req.headers.authorization;
    const dataVerify = AuthService.verifyAth(token, true);
    if (!isBoolean(dataVerify)) {
      const tokenAccess = AuthService.generateAuthAccess(
        dataVerify.id,
        dataVerify.sdt,
      );
      return formatRes(res, { token: tokenAccess });
    }
    return formatRes(res, null);
  }
}
