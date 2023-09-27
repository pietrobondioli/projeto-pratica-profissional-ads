import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';

import { UpdateEquipmentCommand } from './update-equipment.command';
import { UpdateEquipmentDto } from './update-equipment.req.dto';

@ApiTags(...routesV1.equipment.tags)
@Controller(routesV1.version)
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
  async update(@Param('id') id: string, @Body() body: UpdateEquipmentDto) {
    const command = new UpdateEquipmentCommand({
      equipmentId: id,
      ...body,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      (id: string) => new IdResponse(id),
      (error) => {
        throw error;
      },
    );
  }
}
