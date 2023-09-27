import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { isPast } from 'date-fns';
import { Err, Ok } from 'neverthrow';

import { PasswordHelper } from '#/be/lib/utils/password-helper';

import { UserModel, UserRepo } from '../../db/user.model';
import { ChangePasswordToken } from '../../domain/change-password-token.entity';
import { TokenInvalidError } from '../../domain/errors/token-invalid.error';
import { TokenNotFoundError } from '../../domain/errors/token-not-found.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { CHANGE_PASSWORD_TOKEN_REPO, USER_REPO } from '../../user.di-tokens';

import { ChangePasswordTokenRepo } from '../../db/change-password-token.model';
import { ChangePasswordCommand } from './change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements IInferredCommandHandler<ChangePasswordCommand>
{
  constructor(
    @Inject(CHANGE_PASSWORD_TOKEN_REPO)
    protected readonly changePasswordTokenRepo: ChangePasswordTokenRepo,
    @Inject(USER_REPO)
    protected readonly userRepo: UserRepo,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: ChangePasswordCommand,
  ): Promise<CommandResult<ChangePasswordCommand>> {
    try {
      const token = await this.changePasswordTokenRepo.findOne({
        where: {
          token: command.payload.token,
        },
        relations: {
          user: true,
        },
      });

      if (!token) {
        return new Err(new TokenNotFoundError());
      }

      if (!this.isTokenValid(token)) {
        return new Err(new TokenInvalidError());
      }

      UserAggregate.user(token.user).changedPassword(token);

      await this.consumeToken(token);

      await this.updatePassword(token.user, command.payload.newPassword);

      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } catch (error: any) {
      UserAggregate.clearEvents();

      throw error;
    }
  }

  private isTokenValid(token: ChangePasswordToken) {
    return (
      !isPast(token.expiresAt) &&
      token.invalidatedAt &&
      !isPast(token.invalidatedAt) &&
      token.consumedAt &&
      !isPast(token.consumedAt)
    );
  }

  private async consumeToken(token: ChangePasswordToken) {
    token.consumedAt = new Date();

    await this.changePasswordTokenRepo.save(token);
  }

  private async updatePassword(user: UserModel, newPassword: string) {
    user.passwordHash = PasswordHelper.hashPassword(newPassword);

    await this.userRepo.save(user);
  }
}
