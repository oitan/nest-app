import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { handleEndpointErrors } from './endpoint-error-handler';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionsFilter.name);

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost<ExpressAdapter>,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    if (host.getType() !== 'http') {
      this.logger.error('Caught exception from non HTTP host');
      throw exception;
    }

    const ctx = host.switchToHttp();

    const { httpAdapter } = this.httpAdapterHost;

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const responseBody: {
      timestamp: string;
      path: string;
      method: string;
      statusCode?: number;
      message?: string;
    } = {
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
      method: request.method,
    };

    if (!(exception instanceof HttpException)) {
      responseBody.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody.message = `Caught non HttpException exception. This must never happen. Wrap ${request.method} ${request.originalUrl} endpoint into ${handleEndpointErrors.name} function`;
    } else {
      responseBody.statusCode = exception.getStatus();
      responseBody.message = exception.message;
    }

    httpAdapter.reply(response, responseBody, responseBody.statusCode);
  }
}
