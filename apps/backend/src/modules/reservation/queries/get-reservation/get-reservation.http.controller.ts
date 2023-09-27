import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { GetReservationQuery } from './get-reservation.query';
import { GetReservationResDto } from './get-reservation.res.dto';

@ApiTags(...routesV1.reservation.tags)
@Controller(routesV1.version)
export class GetReservationHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.reservation.queries.get)
  @ApiOperation({ summary: 'Get a reservation given its ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetReservationResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Param('id') id: string) {
    const query = new GetReservationQuery({
      reservationId: id,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      (reservation) =>
        plainToInstance(GetReservationResDto, reservation, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
