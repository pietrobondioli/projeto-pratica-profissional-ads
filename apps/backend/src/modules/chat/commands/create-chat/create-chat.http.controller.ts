import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
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
import { Authenticated } from '#/be/lib/application/decorators/authenticated.decorator';

import { CreateChatCommand } from './create-chat.command';
import { CreateChatReqDto } from './create-chat.req.dto';

@ApiTags(...routesV1.chat.tags)
@Controller(routesV1.version)
@Authenticated()
export class CreateChatHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.chat.commands.create)
  @ApiOperation({
    summary: 'Create a chat with a given user with a given initial message',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Body() body: CreateChatReqDto,
    @Res() res: Response,
    @AuthUser() user: UserPayload,
  ) {
    const command = new CreateChatCommand({
      withUserId: body.withUserId,
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
