import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';
import { Authenticated } from '#/be/lib/application/guards/authenticated.guard';

import { ReqConfirmAccountTokenCommand } from './req-confirm-account-token.command';
import { ReqChangePasswordRequestDto } from './req-confirm-account-token.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
@Authenticated()
export class ReqConfirmAccountTokenHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.commands.req_confirm_account_token)
  @ApiOperation({
    summary: 'Request account confirmation token, given the email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(
    @Body() body: ReqChangePasswordRequestDto,
    @Res() res: Response,
  ) {
    const command = new ReqConfirmAccountTokenCommand({
      email: body.email,
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
