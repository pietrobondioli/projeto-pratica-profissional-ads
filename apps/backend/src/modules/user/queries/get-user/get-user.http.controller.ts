import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';

import { GetUserQuery } from './get-user.query';
import { GetUserResDto } from './get-user.res.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
export class GetUserHttpController {
  constructor(private readonly queryBus: QueryBus<GetUserQuery>) {}

  @Get(routesV1.user.queries.get)
  @ApiOperation({ summary: "Get user's info given its id" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Param('id') id: string) {
    const query = new GetUserQuery({
      userId: id,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      (user) =>
        plainToInstance(GetUserResDto, user, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
