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

import { TokenInvalidError } from '../../domain/errors/token-invalid.error';
import { TokenNotFoundError } from '../../domain/errors/token-not-found.error';

import { ChangeEmailCommand } from './change-email.command';
import { ChangeEmailRequestDto } from './change-email.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
export class ChangeEmailHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.commands.change_email)
  @ApiOperation({ summary: 'Change email, using token' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Body() body: ChangeEmailRequestDto, @Res() res: Response) {
    const command = new ChangeEmailCommand({
      token: body.token,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      () => res.status(HttpStatus.OK).send(),
      (error) => {
        if (error instanceof TokenNotFoundError)
          throw new NotFoundException(error.message);
        if (error instanceof TokenInvalidError)
          throw new BadRequestException(error.message);
        throw error;
      },
    );
  }
}
