import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';
import { Authenticated } from '#/be/lib/application/guards/authenticated.guard';

import {
  AuthUser,
  UserPayload,
} from '#/be/lib/application/decorators/auth-user.decorator';
import { UpdateFeedbackCommand } from './update-feedback.command';
import { UpdateFeedbackReqDto } from './update-feedback.req.dto';

@ApiTags(...routesV1.feedback.tags)
@Controller(routesV1.version)
@Authenticated()
export class UpdateFeedbackHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(routesV1.feedback.commands.update)
  @ApiOperation({ summary: 'Update feedback given its ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Param('feedbackId') feedbackId: string,
    @Body() body: UpdateFeedbackReqDto,
    @Res() res: Response,
    @AuthUser() user: UserPayload,
  ) {
    const command = new UpdateFeedbackCommand({
      feedbackId,
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
