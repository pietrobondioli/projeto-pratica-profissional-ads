import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';
import {
  AuthUser,
  UserPayload,
} from '#/be/lib/application/decorators/auth-user.decorator';
import { Authenticated } from '#/be/lib/application/decorators/authenticated.decorator';

import { Response } from 'express';
import { CreateEquipmentCommand } from './create-equipment.command';
import { CreateEquipmentRequestDto } from './create-equipment.req.dto';

@ApiTags(...routesV1.equipment.tags)
@Controller(routesV1.version)
@Authenticated()
export class CreateEquipmentHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.equipment.commands.create)
  @ApiOperation({ summary: 'Creates a new equipment.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Body() body: CreateEquipmentRequestDto,
    @AuthUser() user: UserPayload,
    @Res() res: Response,
  ) {
    const command = new CreateEquipmentCommand({
      ...body,
      loggedUser: user,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      (id: string) => res.status(HttpStatus.CREATED).send(new IdResponse(id)),
      (error) => {
        throw error;
      },
    );
  }
}
