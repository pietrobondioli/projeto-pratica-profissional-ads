import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { v4 } from 'uuid';

import { ChangePasswordTokenRepo } from '../../db/change-password-token.model';
import { UserModel, UserRepo } from '../../db/user.model';
import { ChangePasswordToken } from '../../domain/change-password-token.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { CHANGE_PASSWORD_TOKEN_REPO, USER_REPO } from '../../user.di-tokens';

import { ReqChangePasswordCommand } from './req-change-password.command';

@CommandHandler(ReqChangePasswordCommand)
export class ReqChangePasswordCommandHandler
  implements IInferredCommandHandler<ReqChangePasswordCommand>
{
  constructor(
    @Inject(CHANGE_PASSWORD_TOKEN_REPO)
    private readonly changePasswordTokenRepo: ChangePasswordTokenRepo,
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: ReqChangePasswordCommand,
  ): Promise<CommandResult<ReqChangePasswordCommand>> {
    try {
      const { email } = command.payload;

      const user = await this.userRepo.findOneBy({
        email: email,
      });

      if (!user) {
        return new Err(new UserNotFoundError());
      }

      const token = new ChangePasswordToken(user.id);
      token.user = user;
      token.token = v4();
      token.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days

      UserAggregate.user(user).requestedPasswordChange(token);

      await this.invalidateOldTokens(user);

      await this.changePasswordTokenRepo.insert(token);

      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } finally {
      UserAggregate.clearEvents();
    }
  }

  private async invalidateOldTokens(user: UserModel) {
    const tokens = await this.changePasswordTokenRepo.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    await Promise.all(
      tokens.map(async (token) => {
        token.invalidatedAt = new Date();
        await this.changePasswordTokenRepo.save(token);
      }),
    );
  }
}
