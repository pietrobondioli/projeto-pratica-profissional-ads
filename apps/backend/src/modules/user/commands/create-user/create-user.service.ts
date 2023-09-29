import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';

import { PasswordHelper } from '#/be/lib/utils/password-helper';

import { UserRepo } from '../../db/user.model';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';
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
      const { email, password } = command.payload;

      const userExists = await this.userRepo.findOneBy({ email });

      if (userExists) {
        return new Err(new UserAlreadyExistsError(email));
      }

      const user = new User('admin');
      user.email = email;
      user.passwordHash = PasswordHelper.hashPassword(password);

      await this.userRepo.save(user);

      UserAggregate.user(user.id).created();
      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(user.id);
    } finally {
      UserAggregate.clearEvents();
    }
  }
}
