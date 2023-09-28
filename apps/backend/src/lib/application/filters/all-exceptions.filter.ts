import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { ExceptionBase } from '../../exceptions/exception.base';
import { GenericError } from '../../exceptions/generic.error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    if (host.getType() !== 'http') {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: any;

    if (exception instanceof ExceptionBase) {
      body = exception.toJSON();
      status = exception.httpStatus;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const customException = new GenericError(
        exception.getResponse()['message'] ?? exception.message,
        exception,
        (<Error>exception).stack,
        exception.getStatus(),
      );
      body = customException.toJSON();
    } else {
      body = new GenericError(
        'Something went wrong.',
        <Error>exception,
        (<Error>exception).stack,
      ).toJSON();
    }

    response.status(status).json(body);
  }
}
