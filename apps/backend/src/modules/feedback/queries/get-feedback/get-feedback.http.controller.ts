import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { GetFeedbackQuery } from './get-feedback.query';
import { GetFeedbackDto } from './get-feedback.res.dto';

@ApiTags(...routesV1.feedback.tags)
@Controller(routesV1.version)
export class GetFeedbackHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.feedback.queries.get)
  @ApiOperation({ summary: 'Get a feedback given its id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetFeedbackDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Param('feedbackId') feedbackId: string) {
    const query = new GetFeedbackQuery({
      feedbackId,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      (feedback) =>
        plainToInstance(GetFeedbackDto, feedback, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
