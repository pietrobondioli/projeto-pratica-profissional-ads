import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { isPast } from 'date-fns';
import { Err, Ok } from 'neverthrow';

import { EmailVerificationTokenRepo } from '../../db/email-verification-token.model';
import { UserRepo } from '../../db/user.model';
import { EmailVerificationToken } from '../../domain/email-verification-token.entity';
import { TokenInvalidError } from '../../domain/errors/token-invalid.error';
import { TokenNotFoundError } from '../../domain/errors/token-not-found.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { User } from '../../domain/user.entity';
import { EMAIL_VERIFICATION_TOKEN_REPO, USER_REPO } from '../../user.di-tokens';

import { ConfirmAccountCommand } from './confirm-account.command';

@CommandHandler(ConfirmAccountCommand)
export class ConfirmAccountCommandHandler
  implements IInferredCommandHandler<ConfirmAccountCommand>
{
  constructor(
    @Inject(EMAIL_VERIFICATION_TOKEN_REPO)
    private readonly emailVerificationTokenRepo: EmailVerificationTokenRepo,
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: ConfirmAccountCommand,
  ): Promise<CommandResult<ConfirmAccountCommand>> {
    try {
      const { token } = command.payload;

      const existingToken = await this.emailVerificationTokenRepo.findOne({
        where: {
          token: token,
        },
        relations: {
          user: true,
        },
      });

      if (!existingToken) {
        return new Err(new TokenNotFoundError());
      }

      if (!this.isTokenValid(existingToken)) {
        return new Err(new TokenInvalidError());
      }

      UserAggregate.user(existingToken.user).confirmedEmail(existingToken);

      await this.consumeToken(existingToken);

      await this.confirmEmail(existingToken.user);

      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } finally {
      UserAggregate.clearEvents();
    }
  }

  private isTokenValid(token: EmailVerificationToken) {
    return (
      !isPast(token.expiresAt) && !token.invalidatedAt && !token.consumedAt
    );
  }

  private async consumeToken(token: EmailVerificationToken) {
    token.consumedAt = new Date();

    await this.emailVerificationTokenRepo.save(token);
  }

  private async confirmEmail(user: User) {
    user.confirmedEmail = true;

    await this.userRepo.save(user);
  }
}
