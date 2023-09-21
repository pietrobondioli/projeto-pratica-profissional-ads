import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { CreateUserService } from './commands/create-user/create-user.service';
import { ChangeEmailTokenModel } from './db/change-email-token.model';
import { ChangePasswordTokenModel } from './db/change-password-token.model';
import { EmailVerificationTokenModel } from './db/email-verification-token.model';
import { UserProfileModel } from './db/user-profile.model';
import { UserModel } from './db/user.model';
import {
  CHANGE_EMAIL_TOKEN_REPO,
  CHANGE_PASSWORD_TOKEN_REPO,
  EMAIL_VERIFICATION_TOKEN_REPO,
  USER_PROFILE_REPO,
  USER_REPO,
} from './user.di-tokens';

// const httpControllers = [];

const commandHandlers: Provider[] = [CreateUserService];

const queryHandlers: Provider[] = [];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: USER_REPO,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserModel),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: USER_PROFILE_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserProfileModel),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: CHANGE_EMAIL_TOKEN_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ChangeEmailTokenModel),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: CHANGE_PASSWORD_TOKEN_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ChangePasswordTokenModel),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EMAIL_VERIFICATION_TOKEN_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EmailVerificationTokenModel),
    inject: ['DATA_SOURCE'],
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [CreateUserHttpController],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class UserModule {}