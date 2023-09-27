import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { ListUserReservationsQuery } from './list-user-reservations.query';
import { ListUserReservationsReqDto } from './list-user-reservations.req.dto';
import { ListUserReservationsResDto } from './list-user-reservations.res.dto';

@ApiTags(...routesV1.reservation.tags)
@Controller(routesV1.version)
export class ListUserReservationsHttpController {
  constructor(private readonly queryBus: QueryBus<ListUserReservationsQuery>) {}

  @Get(routesV1.reservation.queries.list)
  @ApiOperation({ summary: 'List user reservations' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListUserReservationsResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Query() qry: ListUserReservationsReqDto) {
    const query = new ListUserReservationsQuery(qry);

    const result = await this.queryBus.execute(query);

    return result.match(
      (entity) =>
        plainToInstance(ListUserReservationsResDto, entity, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
