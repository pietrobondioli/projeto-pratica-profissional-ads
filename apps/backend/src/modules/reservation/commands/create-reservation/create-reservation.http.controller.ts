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

import { CreateReservationCommand } from './create-reservation.command';
import { CreateReservationReqDto } from './create-reservation.req.dto';

@ApiTags(...routesV1.reservation.tags)
@Controller(routesV1.version)
@Authenticated()
export class CreateReservationHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.reservation.commands.create)
  @ApiOperation({ summary: 'Create a reservation' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Body() body: CreateReservationReqDto,
    @Res() res: Response,
    @AuthUser() user: UserPayload,
  ) {
    const command = new CreateReservationCommand({
      equipmentId: body.equipmentId,
      startDate: body.startDate,
      endDate: body.endDate,
      loggedUser: user,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      (id) => res.status(HttpStatus.CREATED).send(new IdResponse(id)),
      (error) => {
        throw error;
      },
    );
  }
}
