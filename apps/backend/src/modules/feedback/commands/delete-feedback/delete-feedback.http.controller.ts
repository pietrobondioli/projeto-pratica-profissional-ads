import { Controller, Delete, HttpStatus, Param, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { Authenticated } from '#/be/modules/auth/guards/jwt-auth.guard';
import { DeleteFeedbackCommand } from './delete-feedback.command';
import { DeleteFeedbackReqDto } from './delete-feedback.req.dto';

@ApiTags(...routesV1.feedback.tags)
@Controller(routesV1.version)
@Authenticated()
export class DeleteFeedbackHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete(routesV1.feedback.commands.delete)
  @ApiOperation({ summary: 'Delete a feedback given its ID' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Param() params: DeleteFeedbackReqDto, @Res() res: Response) {
    const command = new DeleteFeedbackCommand({
      feedbackId: params.feedbackId,
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
