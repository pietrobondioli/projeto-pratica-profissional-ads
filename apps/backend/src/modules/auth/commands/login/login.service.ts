import { PasswordHelper } from '#/be/lib/utils/password-helper';
import { UserRepo } from '#/be/modules/user/db/user.model';
import { USER_REPO } from '#/be/modules/user/user.di-tokens';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { Err, Ok } from 'neverthrow';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials.error';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler
  implements IInferredCommandHandler<LoginCommand>
{
  constructor(
    @Inject(USER_REPO)
    protected readonly UserRepo: UserRepo,
    protected readonly eventEmitter: EventEmitter2,
    protected readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<CommandResult<LoginCommand>> {
    const { email, password } = command.payload;

    const user = await this.UserRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return new Err(new InvalidCredentialsError());
    }

    if (!PasswordHelper.comparePassword(password, user.passwordHash)) {
      return new Err(new InvalidCredentialsError());
    }

    return new Ok({
      token: this.jwtService.sign({ id: user.id }),
    });
  }
}
