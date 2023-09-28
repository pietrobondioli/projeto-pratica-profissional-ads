import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Err, Ok } from 'neverthrow';
import { v4 } from 'uuid';

import { EmailVerificationTokenRepo } from '../../db/email-verification-token.model';
import { UserModel, UserRepo } from '../../db/user.model';
import { EmailVerificationToken } from '../../domain/email-verification-token.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { EMAIL_VERIFICATION_TOKEN_REPO, USER_REPO } from '../../user.di-tokens';

import { ReqConfirmAccountTokenCommand } from './req-confirm-account-token.command';

@CommandHandler(ReqConfirmAccountTokenCommand)
export class ReqConfirmAccountTokenCommandHandler
  implements IInferredCommandHandler<ReqConfirmAccountTokenCommand>
{
  constructor(
    @Inject(EMAIL_VERIFICATION_TOKEN_REPO)
    private readonly emailVerificationTokenRepo: EmailVerificationTokenRepo,
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: ReqConfirmAccountTokenCommand,
  ): Promise<CommandResult<ReqConfirmAccountTokenCommand>> {
    try {
      const { email } = command.payload;

      const user = await this.userRepo.findOneBy({
        email: email,
      });

      if (!user) {
        return new Err(new UserNotFoundError());
      }

      const token = new EmailVerificationToken(user.id);
      token.user = user;
      token.token = v4();
      token.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1); // 1 day

      UserAggregate.user(user).requestedEmailConfirmationResend(token);

      await this.invalidateOldTokens(user);

      await this.emailVerificationTokenRepo.save(token);

      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(token.id);
    } finally {
      UserAggregate.clearEvents();
    }
  }

  private async invalidateOldTokens(user: UserModel) {
    const tokens = await this.emailVerificationTokenRepo.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    await Promise.all(
      tokens.map(async (token) => {
        token.invalidatedAt = new Date();
        await this.emailVerificationTokenRepo.save(token);
      }),
    );
  }
}
