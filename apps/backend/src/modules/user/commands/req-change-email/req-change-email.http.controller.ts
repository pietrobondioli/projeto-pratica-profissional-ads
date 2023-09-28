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
import {
  AuthUser,
  UserPayload,
} from '#/be/lib/application/decorators/auth-user.decorator';
import { Authenticated } from '#/be/lib/application/guards/authenticated.guard';

import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

import { ReqChangeEmailCommand } from './req-change-email.command';
import { ReqChangeEmailRequestDto } from './req-change-email.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
@Authenticated()
export class ReqChangeEmailHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.commands.req_change_email)
  @ApiOperation({ summary: 'Request to change email' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Body() body: ReqChangeEmailRequestDto,
    @Res() res: Response,
    @AuthUser() user: UserPayload,
  ) {
    const command = new ReqChangeEmailCommand({
      loggedUser: user,
      newEmail: body.newEmail,
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
