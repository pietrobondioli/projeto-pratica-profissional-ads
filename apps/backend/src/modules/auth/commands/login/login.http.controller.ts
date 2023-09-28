import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { Authenticated } from '../../guards/jwt-auth.guard';
import { LoginCommand } from './login.command';
import { LoginReqDto } from './login.req.dto';

@ApiTags(...routesV1.auth.tags)
@Controller(routesV1.version)
@Authenticated()
export class LoginHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.auth.commands.login)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Body() body: LoginReqDto, @Res() res: Response) {
    const command = new LoginCommand({
      email: body.email,
      password: body.password,
    });

    const result = await this.commandBus.execute(command);

    return result.match(
      (tokenObj) => res.status(HttpStatus.OK).send(tokenObj),
      (error) => {
        throw error;
      },
    );
  }
}
