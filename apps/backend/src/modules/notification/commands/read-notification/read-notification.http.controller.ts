import { Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { ReadNotificationCommand } from './read-notification.command';
import { ReadNotificationReqParamsDto } from './read-notification.req.params.dto';

@ApiTags(...routesV1.notification.tags)
@Controller(routesV1.version)
export class ReadNotificationHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.notification.commands.read)
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
  ) {
    const command = new ReadNotificationCommand({
      notificationId: params.notificationId,
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
