import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { CqrsModule } from '@nestjs/cqrs';
import { LoginHttpController } from './commands/login/login.http.controller';
import { LoginCommandHandler } from './commands/login/login.service';

@Module({
  imports: [CqrsModule, UserModule],
  providers: [LoginCommandHandler],
  controllers: [LoginHttpController],
})
export class AuthModule {}
