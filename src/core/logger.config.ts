import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { Options } from 'pino-http';
import { Environment } from 'src/config/environment.enum';
import { stdTimeFunctions } from 'pino';
import { Params } from 'nestjs-pino';
import { XCorrelationIdHeader } from './headers.const';
import { AppConfigService } from 'src/config/app-config.service';

export function getLoggerConfig(appConfigService: AppConfigService): Params {
  const pinoHttp = {
    genReqId: (req) => req.headers[XCorrelationIdHeader] || randomUUID(),
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
    customReceivedObject: (req, _res, _val) => ({
      url: req.url,
      method: req.method,
      query: req.query,
      params: req.params,
      body: req.body,
    }),
    customReceivedMessage: (_req, _res) => 'new API request',
  } as Options<Request, Response>;
  return { pinoHttp };
}
