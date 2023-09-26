import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';

import { CreateEquipmentCommand } from './create-equipment.command';
import { CreateEquipmentRequestDto } from './create-equipment.req.dto';

@ApiTags(...routesV1.equipment.tags)
@Controller(routesV1.version)
export class CreateEquipmentHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Creates a new equipment.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.equipment.create)
  async execute(@Body() body: CreateEquipmentRequestDto) {
    const command = new CreateEquipmentCommand(body);

    const result = await this.commandBus.execute(command);

    return result.match(
      (id: string) => new IdResponse(id),
      (error: Error) => {
        throw error;
      },
    );
  }
}
