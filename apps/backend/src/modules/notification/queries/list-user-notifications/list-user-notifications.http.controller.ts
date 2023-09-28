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
import { ListUserNotificationsQuery } from './list-user-notifications.query';
import { ListUserNotificationsReqDto } from './list-user-notifications.req.dto';
import { ListUserNotificationsResDto } from './list-user-notifications.res.dto';

@ApiTags(...routesV1.notification.tags)
@Controller(routesV1.version)
@Authenticated()
export class ListUserNotificationsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.notification.queries.list)
  @ApiOperation({ summary: 'List user notifications' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListUserNotificationsResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Query() qry: ListUserNotificationsReqDto,
    @AuthUser() user: UserPayload,
  ) {
    const query = new ListUserNotificationsQuery({
      ...qry,
      loggedUser: user,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      (entity) =>
        plainToInstance(ListUserNotificationsResDto, entity, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
