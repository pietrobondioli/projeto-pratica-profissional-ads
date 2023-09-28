import { Controller, Delete, HttpStatus, Param, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { Authenticated } from '#/be/lib/application/guards/authenticated.guard';

import {
  AuthUser,
  UserPayload,
} from '#/be/lib/application/decorators/auth-user.decorator';
import { CancelReservationCommand } from './cancel-reservation.command';
import { CancelReservationReqParamsDto } from './cancel-reservation.req.params.dto';

@ApiTags(...routesV1.reservation.tags)
@Controller(routesV1.version)
@Authenticated()
export class CancelReservationHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete(routesV1.reservation.commands.cancel)
  @ApiOperation({ summary: 'Cancel a reservation given its ID' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Param() params: CancelReservationReqParamsDto,
    @Res() res: Response,
    @AuthUser() user: UserPayload,
  ) {
    const command = new CancelReservationCommand({
      reservationId: params.reservationId,
      loggedUser: user,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      () => res.status(HttpStatus.OK).send(),
      (error) => {
        throw error;
      },
    );
  }
}
