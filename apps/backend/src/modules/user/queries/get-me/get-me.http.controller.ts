import { Controller, Get, HttpStatus } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import {
  AuthUser,
  UserPayload,
} from '#/be/lib/application/decorators/auth-user.decorator';
import { Authenticated } from '#/be/lib/application/decorators/authenticated.decorator';
import { GetMeQuery } from './get-me.query';
import { GetMeResDto } from './get-me.res.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
@Authenticated()
export class GetMeHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.user.queries.me)
  @ApiOperation({ summary: "Get logged user' profile" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetMeResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@AuthUser() user: UserPayload) {
    const query = new GetMeQuery({
      loggedUser: user,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      (user) =>
        plainToInstance(GetMeResDto, user, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
