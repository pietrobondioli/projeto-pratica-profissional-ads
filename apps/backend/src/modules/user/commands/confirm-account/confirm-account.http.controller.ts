import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { ConfirmAccountCommand } from './confirm-account.command';
import { ConfirmAccountReqDto } from './confirm-account.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
export class ConfirmAccountHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.commands.confirm_account)
  @ApiOperation({ summary: 'Confirm user email.' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Body() body: ConfirmAccountReqDto, @Res() res: Response) {
    const command = new ConfirmAccountCommand({
      token: body.token,
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
