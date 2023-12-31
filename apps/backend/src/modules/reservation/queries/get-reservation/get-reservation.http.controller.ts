import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { Authenticated } from '#/be/lib/application/decorators/authenticated.decorator';

import {
  AuthUser,
  UserPayload,
} from '#/be/lib/application/decorators/auth-user.decorator';
import { GetReservationQuery } from './get-reservation.query';
import { GetReservationResDto } from './get-reservation.res.dto';

@ApiTags(...routesV1.reservation.tags)
@Controller(routesV1.version)
@Authenticated()
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
  async execute(
    @Param('reservationId') reservationId: string,
    @AuthUser() user: UserPayload,
  ) {
    const query = new GetReservationQuery({
      reservationId,
      loggedUser: user,
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
