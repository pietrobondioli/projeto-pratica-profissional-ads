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
import { UpdateFeedbackCommand } from './update-feedback.command';
import { UpdateFeedbackReqDto } from './update-feedback.req.dto';

@ApiTags(...routesV1.feedback.tags)
@Controller(routesV1.version)
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
    @Param('id') id: string,
    @Body() body: UpdateFeedbackReqDto,
    @Res() res: Response,
  ) {
    const command = new UpdateFeedbackCommand({
      feedbackId: id,
      rating: body.rating,
      comment: body.comment,
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
