import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';

import { GetEquipmentAvailabilityQuery } from './get-equipment-avaiability.query';
import { GetEquipmentAvailabilityReqDto } from './get-equipment-avaiability.req.dto';
import { GetEquipmentAvailabilityResDto } from './get-equipment-avaiability.res.dto';

@ApiTags(...routesV1.equipment.tags)
@Controller(routesV1.version)
export class GetEquipmentAvailabilityHttpController {
  constructor(
    private readonly queryBus: QueryBus<GetEquipmentAvailabilityQuery>,
  ) {}

  @Get(routesV1.equipment.queries.get_availability)
  @ApiOperation({
    summary: 'Get equipment availability, return a list of not available dates',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetEquipmentAvailabilityResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Param('equipmentId') equipmentId: string,
    @Query() qry: GetEquipmentAvailabilityReqDto,
  ) {
    const query = new GetEquipmentAvailabilityQuery({
      equipmentId,
      startDate: qry.startDate,
      endDate: qry.endDate,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      (eq) =>
        plainToInstance(GetEquipmentAvailabilityResDto, eq, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
