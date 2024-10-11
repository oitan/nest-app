import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { XCorrelationIdHeader } from './headers.const';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (!req.headers[XCorrelationIdHeader]) {
      const correlationId = randomUUID();
      req.headers[XCorrelationIdHeader] = correlationId;
    }

    next();
  }
}
