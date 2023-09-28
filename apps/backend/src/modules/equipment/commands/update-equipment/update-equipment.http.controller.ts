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

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';
import { Authenticated } from '#/be/lib/application/decorators/authenticated.decorator';

import { Response } from 'express';
import { UpdateEquipmentCommand } from './update-equipment.command';
import { UpdateEquipmentDto } from './update-equipment.req.dto';

@ApiTags(...routesV1.equipment.tags)
@Controller(routesV1.version)
@Authenticated()
export class UpdateEquipmentHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Updates an equipment given its id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Patch(routesV1.equipment.commands.update)
  async update(
    @Param('equipmentId') equipmentId: string,
    @Body() body: UpdateEquipmentDto,
    @Res() res: Response,
  ) {
    const command = new UpdateEquipmentCommand({
      equipmentId,
      ...body,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      (id: string) => res.status(HttpStatus.OK).send(new IdResponse(id)),
      (error) => {
        throw error;
      },
    );
  }
}
