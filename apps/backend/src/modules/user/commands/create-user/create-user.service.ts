import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Err, Ok } from 'neverthrow';

import { PasswordHelper } from '#/be/lib/utils/password-helper';

import { UserRepo } from '../../db/user.model';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';
import { UserProfile } from '../../domain/user-profile.entity';
import { UserAggregate } from '../../domain/user.aggregate';
import { User } from '../../domain/user.entity';
import { USER_REPO } from '../../user.di-tokens';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements IInferredCommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<CommandResult<CreateUserCommand>> {
    try {
      const user = new User('admin');
      user.email = command.payload.email;
      user.passwordHash = PasswordHelper.hashPassword(command.payload.password);
      user.userProfile = new UserProfile('admin');

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
