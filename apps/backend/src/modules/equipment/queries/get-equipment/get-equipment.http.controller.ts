import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { Authenticated } from '#/be/modules/auth/guards/jwt-auth.guard';

import { Equipment } from '../../domain/equipment.entity';

import { plainToInstance } from 'class-transformer';
import { GetEquipmentQuery } from './get-equipment.query';
import { GetEquipmentResDto } from './get-equipment.res.dto';

@ApiTags(...routesV1.equipment.tags)
@Controller(routesV1.version)
@Authenticated()
export class GetEquipmentHttpController {
  constructor(private readonly queryBus: QueryBus<GetEquipmentQuery>) {}

  @Get(routesV1.equipment.queries.get)
  @ApiOperation({ summary: 'Get an equipment given its id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetEquipmentResDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Param('equipmentId') equipmentId: string) {
    const query = new GetEquipmentQuery({
      equipmentId,
    });

    const result = await this.queryBus.execute(query);

    return result.match(
      (eq: Equipment) =>
        plainToInstance(GetEquipmentResDto, eq, {
          excludeExtraneousValues: true,
        }),
      (error) => {
        throw error;
      },
    );
  }
}
