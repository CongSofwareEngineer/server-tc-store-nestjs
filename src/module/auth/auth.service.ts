import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from 'src/common/app';

export class AuthService {
  static generateAuth(
    id: string,
    sdt: string,
  ): { tokenAccess: string; tokenRefresh: string } {
    return {
      tokenAccess: this.generateAuthAccess(id, sdt),
      tokenRefresh: this.generateAuthRefresh(id, sdt),
    };
  }

  static generateAuthAccess(id: string, sdt: string): string {
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

  static generateAuthRefresh(id: string, sdt: string): string {
    const jwtRefresh = new JwtService({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiredRefresh },
    });
    const tokenRefresh = jwtRefresh.sign({
      id,
      sdt,
    });

    return tokenRefresh;
  }

  static async verifyAth(
    token: string,
    isRefreshToken: boolean = false,
  ): Promise<{
    id: string;
    sdt: string;
    iat: number;
    exp: number;
  }> {
    const jwt = new JwtService({
      secret: JwtConstants.secret,
      signOptions: {
        expiresIn: isRefreshToken
          ? JwtConstants.expiredRefresh
          : JwtConstants.expiredAccess,
      },
    });

    const data = await jwt.verify(token, {
      secret: JwtConstants.secret,
    });

    return data;
  }

  static async refreshTokenAccess(tokenRefresh: string): Promise<string> {
    const jwt = new JwtService({
      secret: JwtConstants.secret,
      signOptions: {
        expiresIn: JwtConstants.expiredAccess,
      },
    });
    const dataUser = jwt.decode(tokenRefresh);
    const token = this.generateAuthAccess(dataUser.id, dataUser.sdt);

    return token;
  }
}
