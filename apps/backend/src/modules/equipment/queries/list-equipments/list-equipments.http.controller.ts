import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';
import { ListEquipmentQuery } from './list-equipments.query';
import { ListEquipmentsReqDto } from './list-equipments.req.dto';
import { ListEquipmentResDto } from './list-equipments.res.dto';

@ApiTags(...routesV1.equipment.tags)
@Controller(routesV1.version)
export class GetEquipmentHttpController {
  constructor(private readonly queryBus: QueryBus<ListEquipmentQuery>) {}

  @Get(routesV1.equipment.list)
  @ApiOperation({ summary: 'Get a list of equipments' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Query() qry: ListEquipmentsReqDto) {
    const query = new ListEquipmentQuery(qry);

    const result = await this.queryBus.execute(query);

    return result.match(
      (res) =>
        new ListEquipmentResDto(res.items, res.total, res.limit, res.page),
      (error: Error) => {
        throw error;
      },
    );
  }
}
