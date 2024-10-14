import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { X_CORRELATION_ID_HEADER } from './headers.const';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (!req.headers[X_CORRELATION_ID_HEADER]) {
      const correlationId = randomUUID();
      req.headers[X_CORRELATION_ID_HEADER] = correlationId;
    }

    next();
  }
}
