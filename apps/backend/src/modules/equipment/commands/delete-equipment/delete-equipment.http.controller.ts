import { Controller, Delete, HttpStatus, Param, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';
import { Authenticated } from '#/be/lib/application/decorators/authenticated.decorator';

import {
  AuthUser,
  UserPayload,
} from '#/be/lib/application/decorators/auth-user.decorator';
import { Response } from 'express';
import { DeleteEquipmentCommand } from './delete-equipment.command';

@ApiTags(...routesV1.equipment.tags)
@Controller(routesV1.version)
@Authenticated()
export class DeleteEquipmentHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete(routesV1.equipment.commands.delete)
  @ApiOperation({ summary: 'Deletes an equipment' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Param('equipmentId') equipmentId: string,
    @Res() res: Response,
    @AuthUser() user: UserPayload,
  ) {
    const command = new DeleteEquipmentCommand({
      equipmentId,
      loggedUser: user,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      () => res.status(HttpStatus.OK).send(),
      (error) => {
        throw error;
      },
    );
  }
}
