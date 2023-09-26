import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';

import { TokenInvalidError } from '../../domain/errors/token-invalid.error';
import { TokenNotFoundError } from '../../domain/errors/token-not-found.error';
import { ChangePasswordCommand } from './change-password.command';
import { ChangePasswordRequestDto } from './change-password.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
export class ChangePasswordHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.change_email)
  @ApiOperation({ summary: 'Change password, using token' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TokenNotFoundError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: TokenInvalidError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Body() body: ChangePasswordRequestDto, @Res() res: Response) {
    const command = new ChangePasswordCommand({
      token: body.token,
      newPassword: body.newPassword,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      () => res.status(HttpStatus.OK).send(),
      (error: Error) => {
        if (error instanceof TokenNotFoundError)
          throw new NotFoundException(error.message);
        if (error instanceof TokenInvalidError)
          throw new BadRequestException(error.message);
        throw error;
      },
    );
  }
}
