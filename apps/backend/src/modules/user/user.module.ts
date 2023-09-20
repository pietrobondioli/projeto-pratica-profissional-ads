import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { CreateUserService } from './commands/create-user/create-user.service';
import { UserModel } from './db/user.model';
import { USER_REPOSITORY } from './user.di-tokens';

const httpControllers = [CreateUserHttpController];

const commandHandlers: Provider[] = [CreateUserService];

const queryHandlers: Provider[] = [];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserModel),
    inject: ['DATA_SOURCE'],
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class UserModule {}
