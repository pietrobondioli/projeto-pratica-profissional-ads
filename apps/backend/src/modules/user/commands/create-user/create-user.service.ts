import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';
import { Repository } from 'typeorm';

import { EntityID } from '#/be/lib/ddd/entity.base';

import { UserModel } from '../../db/user.model';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { USER_REPOSITORY } from '../../user.di-tokens';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: Repository<UserModel>,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<EntityID, UserAlreadyExistsError>> {
    try {
      const user = UserAggregate.create(
        command.payload.email,
        command.payload.password,
      );

      await this.userRepo.insert({
        email: user.email,
        passwordHash: user.passwordHash,
      });

      return new Ok(user.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return new Err(new UserAlreadyExistsError(error));
      }
      throw error;
    }
  }
}
