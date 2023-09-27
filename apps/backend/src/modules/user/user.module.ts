import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { DatabaseModule } from '#/be/config/database/database.module';
import { TYPEORM_DATA_SOURCE } from '#/be/config/database/database.providers';
import { ChangeEmailHttpController } from './commands/change-email/change-email.http.controller';
import { ChangeEmailCommandHandler } from './commands/change-email/change-email.service';
import { ChangePasswordHttpController } from './commands/change-password/change-password.http.controller';
import { ChangePasswordCommandHandler } from './commands/change-password/change-password.service';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { CreateUserCommandHandler } from './commands/create-user/create-user.service';
import { ReqChangeEmailHttpController } from './commands/req-change-email/req-change-email.http.controller';
import { ReqChangeEmailCommandHandler } from './commands/req-change-email/req-change-email.service';
import { ReqChangePasswordHttpController } from './commands/req-change-password/req-change-password.http.controller';
import { ReqChangePasswordCommandHandler } from './commands/req-change-password/req-change-password.service';
import { ReqConfirmAccountTokenHttpController } from './commands/req-confirm-account-token/req-confirm-account-token.http.controller';
import { ReqConfirmAccountTokenCommandHandler } from './commands/req-confirm-account-token/req-confirm-account-token.service';
import { ChangeEmailTokenModel } from './db/change-email-token.model';
import { ChangePasswordTokenModel } from './db/change-password-token.model';
import { EmailVerificationTokenModel } from './db/email-verification-token.model';
import { UserProfileModel } from './db/user-profile.model';
import { UserModel } from './db/user.model';
import { GetUserHttpController } from './queries/get-user/get-user.http.controller';
import { GetUserQueryHandler } from './queries/get-user/get-user.service';
import {
  CHANGE_EMAIL_TOKEN_REPO,
  CHANGE_PASSWORD_TOKEN_REPO,
  EMAIL_VERIFICATION_TOKEN_REPO,
  USER_PROFILE_REPO,
  USER_REPO,
} from './user.di-tokens';

const commandHandlers: Provider[] = [
  CreateUserCommandHandler,
  ChangeEmailCommandHandler,
  ChangePasswordCommandHandler,
  ReqChangeEmailCommandHandler,
  ReqChangePasswordCommandHandler,
  ReqConfirmAccountTokenCommandHandler,
];

const queryHandlers: Provider[] = [GetUserQueryHandler];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: USER_REPO,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
  {
    provide: USER_PROFILE_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserProfileModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
  {
    provide: CHANGE_EMAIL_TOKEN_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ChangeEmailTokenModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
  {
    provide: CHANGE_PASSWORD_TOKEN_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ChangePasswordTokenModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
  {
    provide: EMAIL_VERIFICATION_TOKEN_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EmailVerificationTokenModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
];

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [
    ChangeEmailHttpController,
    ChangePasswordHttpController,
    CreateUserHttpController,
    ReqChangeEmailHttpController,
    ReqChangePasswordHttpController,
    ReqConfirmAccountTokenHttpController,
    GetUserHttpController,
  ],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
  exports: [...repositories],
})
export class UserModule {}
