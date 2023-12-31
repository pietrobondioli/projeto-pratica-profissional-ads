import { Controller, HttpStatus, Param, Patch, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import {
  AuthUser,
  UserPayload,
} from '#/be/lib/application/decorators/auth-user.decorator';
import { Authenticated } from '#/be/lib/application/decorators/authenticated.decorator';

import { ReadNotificationCommand } from './read-notification.command';
import { ReadNotificationReqParamsDto } from './read-notification.req.params.dto';

@ApiTags(...routesV1.notification.tags)
@Controller(routesV1.version)
@Authenticated()
export class ReadNotificationHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(routesV1.notification.commands.read)
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Param() params: ReadNotificationReqParamsDto,
    @Res() res: Response,
    @AuthUser() user: UserPayload,
  ) {
    const command = new ReadNotificationCommand({
      notificationId: params.notificationId,
      loggedUser: user,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      () => res.status(HttpStatus.OK).send(),
      (error) => {
        throw error;
      },
    );
  }
}
