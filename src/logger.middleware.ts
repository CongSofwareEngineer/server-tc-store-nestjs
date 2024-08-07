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

      if (
        req.originalUrl === '/category/all' ||
        req.originalUrl === '/user/login'
      ) {
        next();
      } else {
        if (process.env.ENABLE_CHECK_AUTH === 'true') {
          if (!AuthService.verifyAth(req.headers.authorization)) {
            res.status(HttpStatus.BAD_REQUEST).send({
              error: 'Authorization expired',
              status: HttpStatus.BAD_REQUEST,
            });
          }
        }
        next();
      }
    } catch (_) {
      res.status(HttpStatus.BAD_REQUEST).send({
        error: 'Not authorization',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
