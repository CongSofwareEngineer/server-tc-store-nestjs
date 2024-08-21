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
      secret: process.env.SECRET_KEY_JWT,
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
      secret: process.env.SECRET_KEY_JWT,
      signOptions: { expiresIn: JwtConstants.expiredRefresh },
    });
    const tokenRefresh = jwtRefresh.sign({
      id,
      sdt,
    });

    return tokenRefresh;
  }

  static verifyAth(
    token: string,
    isRefreshToken: boolean = false,
  ):
    | boolean
    | {
        id: string;
        sdt: string;
        iat: number;
        exp: number;
      } {
    try {
      const jwt = new JwtService({
        secret: process.env.SECRET_KEY_JWT,
        signOptions: {
          expiresIn: isRefreshToken
            ? JwtConstants.expiredRefresh
            : JwtConstants.expiredAccess,
        },
      });

      const data = jwt.verify(token.replace('Bearer ', ''), {
        secret: process.env.SECRET_KEY_JWT,
      });

      return data;
    } catch (error) {
      return false;
    }
  }

  static async refreshTokenAccess(tokenRefresh: string): Promise<string> {
    const jwt = new JwtService({
      secret: process.env.SECRET_KEY_JWT,
      signOptions: {
        expiresIn: JwtConstants.expiredAccess,
      },
    });
    const dataUser = jwt.decode(tokenRefresh);
    const token = this.generateAuthAccess(dataUser.id, dataUser.sdt);

    return token;
  }
}
