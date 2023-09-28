import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { GetMediaQuery } from './get-media.query';
import { GetMediaResDto } from './get-media.res.dto';

@ApiTags(...routesV1.media.tags)
@Controller(routesV1.version)
export class GetMediaHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.media.queries.get)
  @ApiOperation({ summary: 'Get a media given its ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetMediaResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Param('mediaId') mediaId: string) {
    const query = new GetMediaQuery({
      mediaId,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      ({ media, url }) =>
        plainToInstance(
          GetMediaResDto,
          { ...media, url },
          {
            excludeExtraneousValues: true,
          },
        ),
      (error) => {
        throw error;
      },
    );
  }
}
