import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
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

import { IdResponse } from '#/be/lib/api/id.response.dto';
import { SendMessageCommand } from './send-message.command';
import { SendMessageReqDto } from './send-message.req.dto';

@ApiTags(...routesV1.chat.tags)
@Controller(routesV1.version)
@Authenticated()
export class SendMessageHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.chat.commands.send_message)
  @ApiOperation({ summary: 'Sends a message to a chat' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Param('chatId') chatId: string,
    @Body() body: SendMessageReqDto,
    @Res() res: Response,
    @AuthUser() user: UserPayload,
  ) {
    const command = new SendMessageCommand({
      chatId,
      message: body.message,
      loggedUser: user,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      (id) => res.status(HttpStatus.CREATED).send(new IdResponse(id)),
      (error) => {
        throw error;
      },
    );
  }
}
