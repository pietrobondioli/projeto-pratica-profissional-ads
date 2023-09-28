import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { Authenticated } from '#/be/modules/auth/guards/jwt-auth.guard';

import { GetChatQuery } from './get-chat.query';
import { GetChatResDto } from './get-chat.res.dto';

@ApiTags(...routesV1.chat.tags)
@Controller(routesV1.version)
@Authenticated()
export class GetChatHttpController {
  constructor(private readonly queryBus: QueryBus<GetChatQuery>) {}

  @Get(routesV1.chat.queries.get)
  @ApiOperation({ summary: 'Get a chat given its id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetChatResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Param('chatId') chatId: string) {
    const query = new GetChatQuery({
      chatId,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      (chat) =>
        plainToInstance(GetChatResDto, chat, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
