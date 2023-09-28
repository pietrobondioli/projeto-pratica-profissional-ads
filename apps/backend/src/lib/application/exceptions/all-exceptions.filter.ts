import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AlreadyExistsError } from '../../exceptions/already-exists.error';
import { ExceptionBase } from '../../exceptions/exception.base';
import { ExpiredError } from '../../exceptions/expired.error';
import { InvalidError } from '../../exceptions/invalid.error';
import { NotAuthorizedError } from '../../exceptions/not-authorized.error';
import { NotFoundError } from '../../exceptions/not-found.error';

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
    let body: any = exception;

    if (exception instanceof ExceptionBase) {
      body = exception.toJSON();
      if (exception instanceof AlreadyExistsError) {
        status = HttpStatus.CONFLICT;
      } else if (exception instanceof ExpiredError) {
        status = HttpStatus.GONE;
      } else if (exception instanceof InvalidError) {
        status = HttpStatus.BAD_REQUEST;
      } else if (exception instanceof NotAuthorizedError) {
        status = HttpStatus.UNAUTHORIZED;
      } else if (exception instanceof NotFoundError) {
        status = HttpStatus.NOT_FOUND;
      }
    }

    response.status(status).json(body);
  }
}
