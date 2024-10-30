import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './module/auth/auth.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.originalUrl?.includes('bill')) {
        console.log({ url: req.originalUrl });
        console.log({ token: req.headers.authorization });
        console.log({ method: req.method });
      }
      console.log({ method: req.get('host') });
      console.log({ token: req.headers.authorization });
      console.log({ url: req.originalUrl });

      if (req.originalUrl === '/user/login') {
        next();
      } else {
        if (req.method !== 'GET') {
          const dataVerify = AuthService.verifyAth(req.headers.authorization);

          if (!dataVerify) {
            res.status(HttpStatus.BAD_REQUEST).send({
              error: 'Authorization expired',
              status: HttpStatus.BAD_REQUEST,
            });
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } catch (_) {
      res.status(HttpStatus.BAD_REQUEST).send({
        error: 'Not authorization',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
