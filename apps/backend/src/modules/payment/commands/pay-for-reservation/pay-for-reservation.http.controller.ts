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
import { PayForReservationCommand } from './pay-for-reservation.command';
import { PayForReservationReqDto } from './pay-for-reservation.req.dto';

@ApiTags(...routesV1.payment.tags)
@Controller(routesV1.version)
@Authenticated()
export class PayForReservationHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.payment.commands.pay_for_reservation)
  @ApiOperation({ summary: 'Pay for reservation' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Body() body: PayForReservationReqDto,
    @Res() res: Response,
    @AuthUser() loggedUser: UserPayload,
  ) {
    const command = new PayForReservationCommand({
      ...body,
      loggedUser,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      (id) => res.status(HttpStatus.OK).send(new IdResponse(id)),
      (error) => {
        throw error;
      },
    );
  }
}
