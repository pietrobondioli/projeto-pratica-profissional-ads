import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { Authenticated } from '#/be/lib/application/guards/authenticated.guard';

import {
  AuthUser,
  UserPayload,
} from '#/be/lib/application/decorators/auth-user.decorator';
import { ListChatsQuery } from './list-chats.query';
import { ListChatsReqDto } from './list-chats.req.dto';
import { ListChatsResDto } from './list-chats.res.dto';

@ApiTags(...routesV1.chat.tags)
@Controller(routesV1.version)
@Authenticated()
export class ListChatsHttpController {
  constructor(private readonly queryBus: QueryBus<ListChatsQuery>) {}

  @Get(routesV1.chat.queries.list)
  @ApiOperation({ summary: 'List chats given the query params' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListChatsResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Query() qry: ListChatsReqDto, @AuthUser() user: UserPayload) {
    const query = new ListChatsQuery({
      ...qry,
      loggedUser: user,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      (pag) =>
        plainToInstance(ListChatsResDto, pag, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
