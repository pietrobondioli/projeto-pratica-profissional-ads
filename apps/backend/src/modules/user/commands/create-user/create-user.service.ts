import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'neverthrow';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { EntityID } from '#/be/lib/ddd/entity.base';
import { PasswordHelper } from '#/be/lib/utils/password-helper';

import { UserModel } from '../../db/user.model';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { User } from '../../domain/user.entity';
import { USER_REPO } from '../../user.di-tokens';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserService
  implements IInferredCommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(USER_REPO)
    protected readonly userRepo: Repository<UserModel>,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<EntityID, UserAlreadyExistsError>> {
    try {
      const user = new User();
      user.id = v4();
      user.email = command.payload.email;
      user.passwordHash = PasswordHelper.hashPassword(command.payload.password);

      UserAggregate.user(user).created();

      await this.userRepo.save(user);

      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(user.id);
    } catch (error: any) {
      UserAggregate.clearEvents();

      if (error instanceof ConflictException) {
        return new Err(new UserAlreadyExistsError(error));
      }

      throw error;
    }
  }
}
