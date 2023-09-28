import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Err, Ok } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { NotAuthorizedError } from '#/be/lib/exceptions/not-authorized.error';
import { PasswordHelper } from '#/be/lib/utils/password-helper';
import { UserRepo } from '#/be/modules/user/db/user.model';
import { USER_REPO } from '#/be/modules/user/user.di-tokens';

import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler
  implements IInferredCommandHandler<LoginCommand>
{
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly eventEmitter: EventEmitter2,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<CommandResult<LoginCommand>> {
    const { email, password } = command.payload;

    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return new Err(new NotAuthorizedError());
    }

    if (!PasswordHelper.comparePassword(password, user.passwordHash)) {
      return new Err(new NotAuthorizedError());
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      isVerified: user.confirmedEmail,
    };

    return new Ok({
      token: this.jwtService.sign(payload),
    });
  }
}
