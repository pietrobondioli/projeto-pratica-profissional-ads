import { Body, Controller, HttpStatus, Patch, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';
import {
  AuthUser,
  UserPayload,
} from '#/be/lib/application/decorators/auth-user.decorator';
import { Authenticated } from '#/be/lib/application/decorators/authenticated.decorator';
import { UpdateUserProfileCommand } from './update-user-profile.command';
import { UpdateUserProfileDto } from './update-user-profile.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
@Authenticated()
export class UpdateUserProfileHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(routesV1.user.commands.update_profile)
  @ApiOperation({ summary: "Update user's profile" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Body() body: UpdateUserProfileDto,
    @Res() res: Response,
    @AuthUser() user: UserPayload,
  ) {
    const command = new UpdateUserProfileCommand({
      ...body,
      loggedUser: user,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      (id) => res.status(HttpStatus.OK).send(new IdResponse(id)),
      (error) => {
        throw error;
      },
    );
  }
}
