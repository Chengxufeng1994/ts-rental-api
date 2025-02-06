import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ApiResponse } from '../core/api-response';

interface IError {
  message: string;
  code_error: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as Error).message, code_error: '' };

    this.logMessage(request, message, status, exception);
    response
      .status(status)
      .send(new ApiResponse(status, message.message, '', message.code_error));
  }

  private logMessage(
    request: FastifyRequest,
    message: IError,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      Logger.error(
        `End Request for ${request.url}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? (exception as Error).stack : '',
      );
    } else {
      Logger.warn(
        `End Request for ${request.url}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}
