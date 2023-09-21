import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'neverthrow';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';
import { EntityID } from '#/be/lib/ddd/entity.base';

import { TokenInvalidError } from '../../domain/errors/token-invalid.error';
import { TokenNotFoundError } from '../../domain/errors/token-not-found.error';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';
import { ChangeEmailCommand } from './change-email.command';
import { ChangeEmailRequestDto } from './change-email.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
export class ChangeEmailHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Change email, using token' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TokenNotFoundError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: TokenInvalidError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.user.change_email)
  async create(@Body() body: ChangeEmailRequestDto): Promise<IdResponse> {
    const command = new ChangeEmailCommand({
      token: body.token,
    });

    const result: Result<EntityID, UserAlreadyExistsError> =
      await this.commandBus.execute(command);

    return result.match(
      (id: string) => new IdResponse(id),
      (error: Error) => {
        if (error instanceof TokenNotFoundError)
          throw new NotFoundException(error.message);
        if (error instanceof TokenInvalidError)
          throw new BadRequestException(error.message);
        throw error;
      },
    );
  }
}
