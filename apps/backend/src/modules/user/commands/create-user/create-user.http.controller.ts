import {
  Body,
  ConflictException as ConflictHttpException,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'neverthrow';

import { routesV1 } from '#/be/config/routes/app.routes';
import { ApiErrorResponse } from '#/be/lib/api/api-error.response.dto';
import { IdResponse } from '#/be/lib/api/id.response.dto';
import { EntityID } from '#/be/lib/ddd/entity.base';

import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';

import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDto } from './create-user.req.dto';

@ApiTags(...routesV1.user.tags)
@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.user.create)
  async create(@Body() body: CreateUserRequestDto): Promise<IdResponse> {
    const command = new CreateUserCommand(body);

    const result: Result<EntityID, UserAlreadyExistsError> =
      await this.commandBus.execute(command);

    return result.match(
      (id: string) => new IdResponse(id),
      (error: Error) => {
        if (error instanceof UserAlreadyExistsError)
          throw new ConflictHttpException(error.message);
        throw error;
      },
    );
  }
}
