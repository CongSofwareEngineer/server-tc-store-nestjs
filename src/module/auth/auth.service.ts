import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from 'src/common/app';

export class AuthService {
  static generateAth(id: string, sdt: string): string {
    const jwtAccess = new JwtService({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiredAccess },
    });

    const tokenAccess = jwtAccess.sign({
      id,
      sdt,
    });

    return tokenAccess;
  }

  static async verifyAth(token: string): Promise<string> {
    const jwt = new JwtService({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiredAccess },
    });

    const data = await jwt.verify(token, {
      secret: JwtConstants.secret,
    });
    return data;
  }
}
