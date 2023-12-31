import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';

import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';

import { Response } from 'express';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDto } from './create-user.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.commands.create)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  async execute(@Body() body: CreateUserRequestDto, @Res() res: Response) {
    const command = new CreateUserCommand(body);

    const result = await this.commandBus.execute(command);

    return result.match(
      (id: string) => res.status(HttpStatus.CREATED).send(new IdResponse(id)),
      (error) => {
        if (error instanceof UserAlreadyExistsError)
          throw new ConflictException(error.message);
        throw error;
      },
    );
  }
}
