import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { v4 } from 'uuid';

import { UserModel, UserRepo } from '../../db/user.model';
import { ChangeEmailToken } from '../../domain/change-email-token.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { CHANGE_EMAIL_TOKEN_REPO, USER_REPO } from '../../user.di-tokens';

import { ChangeEmailTokenRepo } from '../../db/change-email-token.model';
import { ReqChangeEmailCommand } from './req-change-email.command';

@CommandHandler(ReqChangeEmailCommand)
export class ReqChangeEmailCommandHandler
  implements IInferredCommandHandler<ReqChangeEmailCommand>
{
  constructor(
    @Inject(CHANGE_EMAIL_TOKEN_REPO)
    protected readonly changeEmailTokenRepo: ChangeEmailTokenRepo,
    @Inject(USER_REPO)
    protected readonly userRepo: UserRepo,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: ReqChangeEmailCommand,
  ): Promise<CommandResult<ReqChangeEmailCommand>> {
    try {
      const { userId, newEmail } = command.payload;

      const user = await this.userRepo.findOneBy({
        id: userId,
      });

      if (!user) {
        return new Err(new UserNotFoundError());
      }

      const token = new ChangeEmailToken(userId);
      token.id = v4();
      token.user = user;
      token.newEmail = newEmail;
      token.token = v4();
      token.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days

      UserAggregate.user(user).requestedEmailChange(token);

      await this.invalidateOldTokens(user);

      await this.changeEmailTokenRepo.insert(token);

      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } catch (error: any) {
      UserAggregate.clearEvents();

      throw error;
    }
  }

  private async invalidateOldTokens(user: UserModel) {
    const tokens = await this.changeEmailTokenRepo.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    await Promise.all(
      tokens.map(async (token) => {
        token.invalidatedAt = new Date();
        await this.changeEmailTokenRepo.save(token);
      }),
    );
  }
}
