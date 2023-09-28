import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { Authenticated } from '#/be/modules/auth/guards/jwt-auth.guard';

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
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Body() body: SendMessageReqDto, @Res() res: Response) {
    const command = new SendMessageCommand({
      chatId: body.chatId,
      message: body.message,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      (id) => res.status(HttpStatus.CREATED).send(id),
      (error) => {
        throw error;
      },
    );
  }
}
