import {
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

import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

import { ReqChangePasswordCommand } from './req-change-password.command';
import { ReqChangePasswordRequestDto } from './req-change-password.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
export class ReqChangePasswordHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Request to change password, given the email' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserNotFoundError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.user.commands.req_change_password)
  async execute(
    @Body() body: ReqChangePasswordRequestDto,
    @Res() res: Response,
  ) {
    const command = new ReqChangePasswordCommand({
      email: body.email,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      () => res.status(HttpStatus.OK).send(),
      (error) => {
        if (error instanceof UserNotFoundError)
          throw new NotFoundException(error.message);
        throw error;
      },
    );
  }
}
