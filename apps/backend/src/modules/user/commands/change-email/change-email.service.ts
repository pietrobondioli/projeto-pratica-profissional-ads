import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { isPast } from 'date-fns';
import { Err, Ok } from 'neverthrow';

import { UserModel, UserRepo } from '../../db/user.model';
import { ChangeEmailToken } from '../../domain/change-email-token.entity';
import { TokenInvalidError } from '../../domain/errors/token-invalid.error';
import { TokenNotFoundError } from '../../domain/errors/token-not-found.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { CHANGE_EMAIL_TOKEN_REPO, USER_REPO } from '../../user.di-tokens';

import { ChangeEmailTokenRepo } from '../../db/change-email-token.model';
import { ChangeEmailCommand } from './change-email.command';

@CommandHandler(ChangeEmailCommand)
export class ChangeEmailCommandHandler
  implements IInferredCommandHandler<ChangeEmailCommand>
{
  constructor(
    @Inject(CHANGE_EMAIL_TOKEN_REPO)
    private readonly changeEmailTokenRepo: ChangeEmailTokenRepo,
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: ChangeEmailCommand,
  ): Promise<CommandResult<ChangeEmailCommand>> {
    try {
      const token = await this.changeEmailTokenRepo.findOne({
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

      UserAggregate.user(token.user).changedEmail(token);

      await this.consumeToken(token);

      await this.updateEmail(token.user, token.newEmail);

      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } catch (error: any) {
      UserAggregate.clearEvents();

      throw error;
    }
  }

  private isTokenValid(token: ChangeEmailToken) {
    return (
      !isPast(token.expiresAt) &&
      token.invalidatedAt &&
      !isPast(token.invalidatedAt) &&
      token.consumedAt &&
      !isPast(token.consumedAt)
    );
  }

  private async consumeToken(token: ChangeEmailToken) {
    token.consumedAt = new Date();

    await this.changeEmailTokenRepo.save(token);
  }

  private async updateEmail(user: UserModel, newEmail: string) {
    user.email = newEmail;

    await this.userRepo.save(user);
  }
}
