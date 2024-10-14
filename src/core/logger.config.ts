import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';
import type { Options } from 'pino-http';
import { Environment } from 'src/config/environment.enum';
import { stdTimeFunctions } from 'pino';
import { X_CORRELATION_ID_HEADER } from './headers.const';
import { AppConfigService } from 'src/config/app-config.service';
import type { Params } from 'nestjs-pino';

export function getLoggerConfig(appConfigService: AppConfigService): Params {
  const pinoHttp: Options<Request, Response> = {
    genReqId: (req) => req.headers[X_CORRELATION_ID_HEADER] || randomUUID(),
    level: appConfigService.env === Environment.PRODUCTION ? 'info' : 'debug',
    formatters: {
      level: (label) => ({ lvl: label.toUpperCase() }),
    },
    serializers: {
      req: (req: Request) => ({ id: req.id }),
    },
    base: undefined,
    timestamp: stdTimeFunctions.isoTime,
    nestedKey: 'payload',
    customReceivedObject: (req: Request, _res, _val) => ({
      url: req.url,
      method: req.method,
      query: req.query,
      params: req.params,
      body: req.body,
    }),
    customReceivedMessage: (_req, _res) => 'new API request',
  };
  return { pinoHttp: pinoHttp as unknown as Options };
}
