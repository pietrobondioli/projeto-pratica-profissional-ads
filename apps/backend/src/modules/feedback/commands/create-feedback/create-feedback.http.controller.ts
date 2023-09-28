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

import { CreateFeedbackCommand } from './create-feedback.command';
import { CreateFeedbackReqDto } from './create-feedback.req.dto';

@ApiTags(...routesV1.feedback.tags)
@Controller(routesV1.version)
@Authenticated()
export class CreateFeedbackHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.feedback.commands.create)
  @ApiOperation({
    summary: 'Creates a new feedback given the reservation, rating and comment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Body() body: CreateFeedbackReqDto,
    @Res() res: Response,
    @AuthUser() user: UserPayload,
  ) {
    const command = new CreateFeedbackCommand({
      reservationId: body.reservationId,
      rating: body.rating,
      comment: body.comment,
      loggedUser: user,
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
