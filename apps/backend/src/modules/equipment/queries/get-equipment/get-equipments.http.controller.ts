import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';
import { Equipment } from '../../domain/equipment.entity';
import { GetEquipmentQuery } from './get-equipments.query';
import { GetEquipmentResDto } from './get-equipments.res.dto';

@ApiTags(...routesV1.equipment.tags)
@Controller(routesV1.version)
export class GetEquipmentHttpController {
  constructor(private readonly queryBus: QueryBus<GetEquipmentQuery>) {}

  @Get(routesV1.equipment.get)
  @ApiOperation({ summary: 'Get an equipment given its id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Param('id') id: string) {
    const query = new GetEquipmentQuery({
      id,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      (eq: Equipment) => new GetEquipmentResDto(eq),
      (error: Error) => {
        throw error;
      },
    );
  }
}
