import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { v4 } from 'uuid';

import { UserModel, UserRepo } from '../../db/user.model';
import { EmailVerificationToken } from '../../domain/email-verification-token.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { CHANGE_PASSWORD_TOKEN_REPO } from '../../user.di-tokens';

import { EmailVerificationTokenRepo } from '../../db/email-verification-token.model';
import { ReqConfirmAccountTokenCommand } from './req-confirm-account-token.command';

@CommandHandler(ReqConfirmAccountTokenCommand)
export class ReqConfirmAccountTokenCommandHandler
  implements IInferredCommandHandler<ReqConfirmAccountTokenCommand>
{
  constructor(
    @Inject(CHANGE_PASSWORD_TOKEN_REPO)
    protected readonly emailVerificationTokenRepo: EmailVerificationTokenRepo,
    protected readonly userRepo: UserRepo,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: ReqConfirmAccountTokenCommand,
  ): Promise<CommandResult<ReqConfirmAccountTokenCommand>> {
    try {
      const user = await this.userRepo.findOneBy({
        email: command.payload.email,
      });

      if (!user) {
        return new Err(new UserNotFoundError());
      }

      const token = new EmailVerificationToken();
      token.id = v4();
      token.user = user;
      token.token = v4();
      token.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1); // 1 day

      UserAggregate.user(user).requestedEmailConfirmationResend(token);

      await this.invalidateOldTokens(user);

      await this.emailVerificationTokenRepo.insert(token);

      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(token.id);
    } catch (error: any) {
      UserAggregate.clearEvents();

      throw error;
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
