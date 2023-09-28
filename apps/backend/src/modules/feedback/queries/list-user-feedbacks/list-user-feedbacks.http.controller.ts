import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { ListUserFeedbacksQuery } from './list-user-feedbacks.query';
import { ListUserFeedbacksReqDto } from './list-user-feedbacks.req.dto';
import { ListUserFeedbacksResDto } from './list-user-feedbacks.res.dto';

@ApiTags(...routesV1.feedback.tags)
@Controller(routesV1.version)
export class ListUserFeedbacksHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.feedback.queries.list)
  @ApiOperation({ summary: "List user's feedbacks" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListUserFeedbacksResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Query() qry: ListUserFeedbacksReqDto) {
    const query = new ListUserFeedbacksQuery(qry);

    const result = await this.queryBus.execute(query);

    return result.match(
      (pag) =>
        plainToInstance(ListUserFeedbacksResDto, pag, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
