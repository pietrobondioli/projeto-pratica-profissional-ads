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
import { ReqContextProvider } from '#/be/lib/application/request/req.context';

import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

import { ReqChangeEmailCommand } from './req-change-email.command';
import { ReqChangeEmailRequestDto } from './req-change-email.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
export class ReqChangeEmailHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Request to change email' })
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
  @Post(routesV1.user.req_change_email)
  async execute(@Body() body: ReqChangeEmailRequestDto, @Res() res: Response) {
    const loggedUser = ReqContextProvider.getAuthUser();

    const command = new ReqChangeEmailCommand({
      userId: loggedUser.id,
      newEmail: body.newEmail,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      () => res.status(HttpStatus.OK).send(),
      (error: Error) => {
        if (error instanceof UserNotFoundError)
          throw new NotFoundException(error.message);
        throw error;
      },
    );
  }
}
