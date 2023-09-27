import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { v4 } from 'uuid';

import { UserModel, UserRepo } from '../../db/user.model';
import { ChangePasswordToken } from '../../domain/change-password-token.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { CHANGE_PASSWORD_TOKEN_REPO, USER_REPO } from '../../user.di-tokens';

import { ChangePasswordTokenRepo } from '../../db/change-password-token.model';
import { ReqChangePasswordCommand } from './req-change-password.command';

@CommandHandler(ReqChangePasswordCommand)
export class ReqChangePasswordCommandHandler
  implements IInferredCommandHandler<ReqChangePasswordCommand>
{
  constructor(
    @Inject(CHANGE_PASSWORD_TOKEN_REPO)
    protected readonly changePasswordTokenRepo: ChangePasswordTokenRepo,
    @Inject(USER_REPO)
    protected readonly userRepo: UserRepo,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: ReqChangePasswordCommand,
  ): Promise<CommandResult<ReqChangePasswordCommand>> {
    try {
      const user = await this.userRepo.findOneBy({
        email: command.payload.email,
      });

      if (!user) {
        return new Err(new UserNotFoundError());
      }

      const token = new ChangePasswordToken();
      token.id = v4();
      token.user = user;
      token.token = v4();
      token.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days

      UserAggregate.user(user).requestedPasswordChange(token);

      await this.invalidateOldTokens(user);

      await this.changePasswordTokenRepo.insert(token);

      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } catch (error: any) {
      UserAggregate.clearEvents();

      throw error;
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
